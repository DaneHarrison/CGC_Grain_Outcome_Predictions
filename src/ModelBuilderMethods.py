import pandas as pd
from typing import List, Optional, Tuple
from Shared.DataService import DataService
from dotenv import load_dotenv
import os


def getConn(envpath: str = ".env"):
    WEB_PG_ADDR = os.environ.get('WEB_PG_ADDR', None)
    db = None

    if WEB_PG_ADDR:
        db = DataService(os.environ.get('PG_DB'), WEB_PG_ADDR, os.environ.get('PG_PORT'), os.environ.get('PG_USER'), os.environ.get('PG_PW'))
    else:
        load_dotenv(envpath)
        PG_DB = os.getenv("POSTGRES_DB")
        PG_ADDR = os.getenv("POSTGRES_ADDR")
        PG_PORT = os.getenv("POSTGRES_PORT")
        PG_USER = os.getenv("POSTGRES_USER")
        PG_PW = os.getenv("POSTGRES_PW")

        if (
            PG_DB is None
            or PG_ADDR is None
            or PG_PORT is None
            or PG_USER is None
            or PG_PW is None
        ):
            raise Exception("Missing required env var(s)")
        db = DataService(PG_DB, PG_ADDR, int(PG_PORT), PG_USER, PG_PW)

    return db.connect()


def extractYears(
    df: pd.DataFrame, year: int, yearEnd: Optional[int] = None
) -> pd.DataFrame:
    """Extract the rows of a dataframe that correspond to a given year.

    Args:
        df (pd.DataFrame): The dataframe to extract from.
        year (int): The year to extract.
        yearEnd (int, optional): The end year to extract. Defaults to None.

    Returns:
        pd.DataFrame: The extracted dataframe.
    """

    if yearEnd is None:
        return df.loc[df["year"] == year]
    else:
        return df.loc[(df["year"] >= year) & (df["year"] <= yearEnd)]
