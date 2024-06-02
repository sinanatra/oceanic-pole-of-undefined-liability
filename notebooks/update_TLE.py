from spacetrack import SpaceTrackClient
import gspread
from google.oauth2.service_account import Credentials
import urllib.request
import codecs
import time
import os

st = SpaceTrackClient('username', 'password')

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
credentials = Credentials.from_service_account_file('./sheet-274815-b5805997d72c.json', scopes=scope)
gc = gspread.authorize(credentials)
sh = gc.open_by_url('https://docs.google.com/spreadsheets/d/1c1pb33-vHChTvljf46nFVDk-VE_R8p_46HBivIrwR_c/edit?usp=sharing')
worksheet_list = sh.worksheets()
print(worksheet_list)
sheet = worksheet_list[0]

satcat = "https://celestrak.com/pub/satcat.txt"
sat_catalogue = urllib.request.urlopen(satcat).read().decode('utf-8').strip().split("\n")
print(sat_catalogue[0])

sat_dict = {}
for x in sat_catalogue:
    try:
        sat_dict[x.split()[1]] = x
    except:
        continue

#sat_dict = { x.split()[1]:x for x in sat_catalogue}

rows = sheet.row_count

sheetValues = sheet.get_all_values()
tle_dict = {x[2]:x for x in sheetValues}

for key in sat_dict.keys():    
    
    IsParsed = False

    if str('n_' + key) not in tle_dict:
        try:
            if "-" in sat_dict[key][75:85] and "N/A" not in sat_dict[key][119:127]:
                lines = st.tle_latest(norad_cat_id=[key], format='tle')
                lines = lines.split("\n")

                for line1, line2 in zip(*[iter(lines[-3:-1])]*2):
                    
                    updateLine = [str(line1), str(line2) ,str('n_' + key)]
                    print(updateLine)
                    sheet.append_row(updateLine)
                    
                    # Limit the Api request 
                    time.sleep(20)

            else:
                continue

        except Exception as E:
            print(E)
            
