export interface TableData {
    name: string;
    displayName: string;
    dieseaseData: boolean;
};

export interface ColumnData {
    name: string;
    displayName: string;
    selected: boolean;
    loaded: boolean;
}

export interface Data {
    'ergot': [],
    'copernicus': [],
    'soil': [],
    'soilMoisture': [],
    'weatherStations': []
}