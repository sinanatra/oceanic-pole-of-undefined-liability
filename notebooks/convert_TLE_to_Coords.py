import time, codecs
import ephem
from ephem import degree
import datetime
from datetime import timedelta
import urllib.request
import gspread
from google.oauth2.service_account import Credentials

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
credentials = Credentials.from_service_account_file('./sheet-274815-b5805997d72c.json', scopes=scope)
gc = gspread.authorize(credentials)
sh = gc.open_by_url('https://docs.google.com/spreadsheets/d/1c1pb33-vHChTvljf46nFVDk-VE_R8p_46HBivIrwR_c/edit?usp=sharing')
worksheet_list = sh.worksheets()
print(worksheet_list)
sheet = worksheet_list[0]

output_file = codecs.open("output/dataset.tsv","w","utf-8")
output_file.write("tle_0"+"\t"+"tle_1"+"\t"+"lat" + "\t" + "lon" +"\t"+"norad_cat_num"+"\t"+"satellite_name"+"\t"+"ownership"+"\t"+"launch_date"+"\t"+"satellite_decay"+"\t"+"satellite_decay_hour"+"\t"+"rcs"+"\n")

# Load the Space Catalogue as a dictionary
satcat = "https://celestrak.com/pub/satcat.txt"
sat_catalogue = urllib.request.urlopen(satcat).read().decode('utf-8').strip().split("\n")
sat_dict = {x.split()[1]:x for x in sat_catalogue}

print("Starting...")

sheetValues = sheet.get_all_values()

for i in range(2, len(sheetValues)):
    
    # Read lines from TLE file
    row = sheetValues[i]
    tle_line0 = row[0]
    tle_line1 = row[1]
    norad_id  = row[2].replace('n_','')
    possible_satellite_reentry_date = sat_dict[norad_id][75:85] + " " +  "00:00:00"
    try:
        # Read TLE
        name = "sat_data";
            
        tle_rec = ephem.readtle(name, tle_line0, tle_line1);
        tle_rec.compute(possible_satellite_reentry_date)
        
        # Calculate the orbit until it reaches the treshold to reenter in the atmosphere - 122 km
        reentry_threshold = 122000 # official entry inferface by ESA and Nasa
        reentry_threshold = 50000 # limit of space orbit  knudsen number
    
        if int(tle_rec.elevation) >= reentry_threshold:

            d = datetime.datetime.strptime(possible_satellite_reentry_date , '%Y-%m-%d %H:%M:%S')                    

            # Check whetere the debries reenters after max two days 
            for i in range(0,240):
                # Define the next hour
                parseHour = d + timedelta(hours = i)
                tle_rec.compute(parseHour)

                if int(tle_rec.elevation) <= reentry_threshold: # threshold of reentry   
                    output_file.write(str(tle_line0) + "\t" + str(tle_line1) + "\t" ) 
                    output_file.write(str(tle_rec.sublat / degree) + "\t" + str(tle_rec.sublong / degree) +"\t"+str(norad_id)+"\t"+str(sat_dict[norad_id][23:47])+"\t"+str(sat_dict[norad_id][49:54])+"\t"+str(sat_dict[norad_id][56:66])+"\t"+str(sat_dict[norad_id][75:85])+"\t"+str(parseHour)+"\t"+str(sat_dict[norad_id][119:127])+"\n")
                    
                    next2Minutes = parseHour + timedelta(minutes = 2)
                    tle_rec.compute(next2Minutes)
                    output_file.write(str(tle_line0) + "\t" + str(tle_line1) + "\t" ) 
                    output_file.write(str(tle_rec.sublat / degree) + "\t" + str(tle_rec.sublong / degree) +"\t"+str(norad_id)+"\t"+str(sat_dict[norad_id][23:47])+"\t"+str(sat_dict[norad_id][49:54])+"\t"+str(sat_dict[norad_id][56:66])+"\t"+str(sat_dict[norad_id][75:85])+"\t"+str(next2Minutes)+"\t"+str(sat_dict[norad_id][119:127])+"\n")
                    
                    next6Minutes = parseHour + timedelta(minutes = 6)
                    tle_rec.compute(next6Minutes)
                    output_file.write(str(tle_line0) + "\t" + str(tle_line1) + "\t" ) 
                    output_file.write(str(tle_rec.sublat / degree) + "\t" + str(tle_rec.sublong / degree) +"\t"+str(norad_id)+"\t"+str(sat_dict[norad_id][23:47])+"\t"+str(sat_dict[norad_id][49:54])+"\t"+str(sat_dict[norad_id][56:66])+"\t"+str(sat_dict[norad_id][75:85])+"\t"+str(next6Minutes)+"\t"+str(sat_dict[norad_id][119:127])+"\n")
                    break

        # check for the debris altitude
        elif int(tle_rec.elevation) <= reentry_threshold: # threshold of reentry     
            next2Minutes = parseHour + timedelta(minutes = 2)
            tle_rec.compute(next2Minutes)
            output_file.write(str(tle_line0) + "\t" + str(tle_line1) + "\t" ) 
            output_file.write(str(tle_rec.sublat / degree) + "\t" + str(tle_rec.sublong / degree) +"\t"+str(norad_id)+"\t"+str(sat_dict[norad_id][23:47])+"\t"+str(sat_dict[norad_id][49:54])+"\t"+str(sat_dict[norad_id][56:66])+"\t"+str(sat_dict[norad_id][75:85])+"\t"+str(next2Minutes)+"\t"+str(sat_dict[norad_id][119:127])+"\n")

            next6Minutes = parseHour + timedelta(minutes = 6)
            tle_rec.compute(next6Minutes)
            output_file.write(str(tle_line0) + "\t" + str(tle_line1) + "\t" ) 
            output_file.write(str(tle_rec.sublat / degree) + "\t" + str(tle_rec.sublong / degree) +"\t"+str(norad_id)+"\t"+str(sat_dict[norad_id][23:47])+"\t"+str(sat_dict[norad_id][49:54])+"\t"+str(sat_dict[norad_id][56:66])+"\t"+str(sat_dict[norad_id][75:85])+"\t"+str(next6Minutes)+"\t"+str(sat_dict[norad_id][119:127])+"\n")
            
    
    except Exception as e:
        continue

output_file.close

print("\nFinished parsing!")
