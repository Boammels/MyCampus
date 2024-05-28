import pandas as pd

from query_service import *
from building_list import Building_list
from facility import Facility
from building import Building


def initialize():
    df_building = pd.read_excel("Building.xlsx")
    df_building.dropna(axis=0, how='any', inplace=True)
    fac_df = pd.read_excel("facilities.xlsx")
    building_list = []
    for row in df_building.itertuples():
        facilities = []
        for fac_row in fac_df[fac_df['Building'] == row.EnglishName].itertuples():
            facility = Facility(fac_row.Index, fac_row.EnglishName, fac_row.Building, fac_row.Position,
                                fac_row.Description,
                                fac_row.OpeningHours, fac_row.image_link, fac_row.Link, fac_row.Type)
            facilities.append(facility)

        building = Building(row.Index, row.EnglishName, row.ChineseName, row.Coordinate, row.PositionDescription,
                            row.Abbreviation,
                            facilities)
        building_list.append(building)

    return Building_list(building_list)


# For testing (Delete it)
b_list = initialize()
for building in b_list.building_list:
    print("BUILDING:", building.building_id, building.english_name, building.chinese_name,
          building.position_description,
          building.abbreviation, building.coordinate)
    for fac in building.facilities:
        print("\tFACILITY:", fac.facility_id, fac.fac_type, fac.english_name, fac.description)
