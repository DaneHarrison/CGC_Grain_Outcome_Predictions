# -------------------------------------------
# soilAggregation.py
#
# After loading the soil data and agriculture regions data the following class can be used to aggregate the soil data per district
#   soil data: https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/blob/industrialProject/src/Soil/importSoil.ipynb
#   agriculture regions data: https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/blob/industrialProject/src/WeatherStation/importBoundariesAndStations.ipynb
#
# Output table:
#   agg_soil_data: https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/tree/industrialProject#agg_soil_data
# -------------------------------------------
from dotenv import load_dotenv
import geopandas as gpd  # type: ignore
import sqlalchemy as sq
import pandas as pd
import os, sys

try:
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
except:
    pass

sys.path.append("../")
from Shared.DataService import DataService


# name of the table we are creating to hold the aggregated data
TABLENAME = "agg_soil_data"

# name of the table that holds soil geometries/borders
SOIL_GEOM_TABLE = "soil_geometry"

SOIL_COMP_TABLE = "soil_components"  # name of the table that holds the various soil components (different soils) per soil geometry
SOIL_SURRONDINGS_TABLE = "soil_surronding_land"  # name of the table that holds the land composition details around each soil geometry
SOIL_DATA_TABLE = "soil_data"  # name of the table that holds the soil properties per province and soil code

# name of the table that holds the agriculture regions
AG_REGIONS_TABLE = "census_ag_regions"


# Load the database connection environment variables located in the docker folder
try:
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
except:
    pass

load_dotenv("../docker/.env")
PG_DB = os.getenv("POSTGRES_DB")
PG_ADDR = os.getenv("POSTGRES_ADDR")
PG_PORT = os.getenv("POSTGRES_PORT")
PG_USER = os.getenv("POSTGRES_USER")
PG_PW = os.getenv("POSTGRES_PW")


class SoilAggregator:
    def __init__(self):
        if (
            PG_DB is None
            or PG_ADDR is None
            or PG_PORT is None
            or PG_USER is None
            or PG_PW is None
        ):
            raise ValueError("Environment variables not set")

        db = DataService(PG_DB, PG_ADDR, int(PG_PORT), PG_USER, PG_PW)
        conn = db.connect()

        # get the soil data from each of their respective tables
        soil_data = self.pullSoilData(conn)
        surronding_soil = self.pullSurroundingSoil(conn)
        soil_components = self.pullSoilComponents(conn)
        soil_geometry = self.pullSoilGeometry(conn)

        # Merge data and perform the aggregation per district (vairables remain constant over time)
        merge_df = self.getMergedDF(
            soil_data, surronding_soil, soil_components, soil_geometry
        )

        # Add the resulting table to database, commit it then close the connection
        merge_df.to_sql(
            TABLENAME, conn, schema="public", if_exists="replace", index=False
        )
        conn.commit()
        db.cleanup()

    def pullSoilData(self, conn: sq.engine.Connection) -> pd.DataFrame:
        """
        Loads the soil property data per province and soil code from the soil data table ([readme](https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/tree/industrialProject#soil_data))

        Psuedocode:
        - Create the soil data SQL query
        - [Load the data from the database directly into a DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html)
        - Drop irrelevant attributes (the attributes we are interested in keeping are provided as a list)
        - [Rename id to soil_id](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rename.html)

        Note:
        The inplace parameter makes it so that the dataframe itself is modified (as opposed to a copy). Therefore, the following two line are equivilant:
        1. soil_data.rename(columns={"id": "soil_id"}, inplace=True)
        2. soil_data = soil_data.rename(columns={"id": "soil_id"})
        """
        query = sq.text(f"SELECT * FROM public.{SOIL_DATA_TABLE}")
        soil_data = pd.read_sql(query, conn)
        soil_data = soil_data[
            [
                "id",
                "province",
                "percnt_coarse_frag",
                "total_sand",
                "total_silt",
                "total_clay",
                "percnt_carbon",
                "calcium_ph",
                "proj_ph",
                "water_reten_0",
                "water_reten_10",
                "water_reten_33",
                "water_reten_1500",
                "bulk_density",
                "elec_cond",
                "percnt_wood",
            ]
        ]

        soil_data.rename(columns={"id": "soil_id"}, inplace=True)

        return soil_data

    def pullSurroundingSoil(self, conn: sq.engine.Connection) -> pd.DataFrame:
        """
        Purpose:
        Loads the land composition details around each soil geometry from the soil surronding land table ([readme](https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/tree/industrialProject#soil_surronding_land))

        Psuedocode:
        - Create the surronding soil SQL query
        - [Load the data from the database directly into a DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html)
        - Drop irrelevant attributes (the attributes we are interested in keeping are provided as a list)
        """
        query = sq.text(f"SELECT * FROM public.{SOIL_SURRONDINGS_TABLE}")
        surronding_soil = pd.read_sql(query, conn)
        surronding_soil = surronding_soil[["poly_id", "land_area", "water_area"]]

        return surronding_soil

    def pullSoilComponents(self, conn: sq.engine.Connection) -> pd.DataFrame:
        """
        Purpose:
        Loads the soil components (different soils) per soil geometry from the soil components table ([readme](https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/tree/industrialProject#soil_components))

        Psuedocode:
        - Create the soil component SQL query
        - [Load the data from the database directly into a DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html)
        - Drop irrelevant attributes (the attributes we are interested in keeping are provided as a list)
        """
        query = sq.text(f"SELECT * FROM public.{SOIL_COMP_TABLE}")
        soil_components = pd.read_sql(query, conn)
        soil_components = soil_components[
            [
                "poly_id",
                "province",
                "percent",
                "soil_id",
                "water_holding_cap",
            ]
        ]

        return soil_components

    def pullSoilGeometry(self, conn: sq.engine.Connection) -> pd.DataFrame:
        """
        Purpose:
        Loads the agriculture regions ([readme](https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/tree/industrialProject#census_ag_regions)) and then associates each soil geometry ([readme](https://github.com/DaneHarrison/CGC_Grain_Outcome_Predictions/tree/industrialProject#soil_geometry)) with their respective distirct

        Psuedocode:
        - Create the agriculture region SQL query
        - [Load the data from the database directly into a DataFrame](https://geopandas.org/en/stable/docs/reference/api/geopandas.GeoDataFrame.from_postgis.html)
            - crs specifies the coordinate system which in our case we are using EPSG:3347
            - geom_col specifies the name of the columns we expect to find the geometry/borders within

        - Create the soil geometry SQL query
        - [Load the data from the database directly into a DataFrame](https://geopandas.org/en/stable/docs/reference/api/geopandas.GeoDataFrame.from_postgis.html)
            - crs specifies the coordinate system which in our case we are using EPSG:3347
            - geom_col specifies the name of the columns we expect to find the geometry/borders within

        - Join the soil geometry geodataframe and the regions geodataframe
            - *predicate=intersects* specifies that the regions should be joined *depending on which geometries fall into what regions*
            - *how=inner* specifies that all non intersecting points should be removed
        - Delete index_right (created during the join) and geomtetry and return the results as a DataFrame (without geometry)
        """
        regionQuery = sq.text(
            "select district, geometry FROM public.{AG_REGIONS_TABLE}"
        )
        agRegions = gpd.GeoDataFrame.from_postgis(
            regionQuery, conn, crs="EPSG:3347", geom_col="geometry"
        )

        soilQuery = sq.text("select * FROM public.{SOIL_GEOM_TABLE}")
        soilRegions = gpd.GeoDataFrame.from_postgis(
            soilQuery, conn, crs="EPSG:3347", geom_col="geometry"
        )

        # Join to add district to df
        soil_geometry = gpd.sjoin(
            soilRegions, agRegions, how="inner", predicate="intersects"
        )

        soil_geometry = pd.DataFrame(
            soil_geometry.drop(columns=["geometry", "index_right"])
        )

        return soil_geometry

    def getMergedDF(
        self,
        soil_data: pd.DataFrame,
        surronding_soil: pd.DataFrame,
        soil_components: pd.DataFrame,
        soil_geometry: pd.DataFrame,
    ) -> pd.DataFrame:
        """
        Purpose:
        Merges all soil DataFrames into one

        Psuedocode:
        - Join soil components and soil data on soil_id and province
        - Join the resulting DataFrame to surronding soil on poly_id
        - Join the resulting dataframe to soil geometry on the poly_id
        - Convert categorical data into numeric values (water_holding_cap uses numbers as classes, therefore we convert this to an integer)

        - Get a list of the columns, removing the names of the columns we will not want to scale by their percentage weights
        - Scale each column by the percentage amount that its corresponding component occupies (by row since their component percentage will vary)
        - Drop columns used for preprocessing
        - Aggregate the remaining columns by district returning their mean
        - Name the columns into the final DataFrame

        Note:
        In each merge, any non intersecting data is deleted as per **how=inner**
        """
        merge_df = soil_components.merge(
            soil_data, on=["soil_id", "province"], how="inner"
        )
        merge_df = merge_df.merge(surronding_soil, on="poly_id", how="inner")
        merge_df = merge_df.merge(soil_geometry, on="poly_id", how="inner")

        # Commands to change attributes which are object types
        merge_df["water_holding_cap"] = pd.to_numeric(
            merge_df["water_holding_cap"], errors="coerce"
        )

        # Removes the columns we wont want to scale by weights (percent of polygon occupied)
        cols = merge_df.columns.tolist()
        cols.remove("poly_id")
        cols.remove("province")
        cols.remove("soil_id")
        cols.remove("percent")
        cols.remove("district")

        # Modifies values to take the percentage of attributes into account
        for index in range(len(merge_df)):
            for col in cols:
                merge_df.loc[index, col] = (
                    merge_df.loc[index, "percent"] * merge_df.loc[index, col] * 0.01  # type: ignore
                )

        merge_df.drop(
            columns=["poly_id", "province", "soil_id", "percent"], inplace=True
        )

        # Aggregate Data
        final_df = (
            merge_df.groupby(["district"])
            .agg(
                {
                    "percnt_coarse_frag": ["mean"],
                    "total_sand": ["mean"],
                    "total_silt": ["mean"],
                    "total_clay": ["mean"],
                    "percnt_carbon": ["mean"],
                    "calcium_ph": ["mean"],
                    "proj_ph": ["mean"],
                    "water_reten_0": ["mean"],
                    "water_reten_10": ["mean"],
                    "water_reten_33": ["mean"],
                    "water_reten_1500": ["mean"],
                    "bulk_density": ["mean"],
                    "elec_cond": ["mean"],
                    "percnt_wood": ["mean"],
                    "water_holding_cap": ["mean"],
                    "land_area": ["mean"],
                    "water_area": ["mean"],
                }
            )
            .reset_index()
        )

        # rename columns
        final_df.columns = [  # type: ignore
            "district",
            "avg_percnt_coarse_frag",
            "avg_total_sand",
            "avg_total_silt",
            "avg_total_clay",
            "avg_percnt_carbon",
            "avg_calcium_ph",
            "avg_proj_ph",
            "avg_water_reten_0",
            "avg_water_reten_10",
            "avg_water_reten_33",
            "avg_water_reten_1500",
            "avg_bulk_density",
            "avg_elec_cond",
            "avg_percnt_wood",
            "avg_water_holding_cap",
            "avg_land_area",
            "avg_water_area",
        ]

        return final_df
