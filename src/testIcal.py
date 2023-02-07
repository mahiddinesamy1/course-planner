import requests
from icalendar import Calendar, Event

url = "https://portail.etsmtl.ca/ICal/SeancesCours?typeact=C&Sigle=LOG210&Groupe=02&Session=20221"
response = requests.get(url)

cal = Calendar.from_ical(response.content)
for component in cal.subcomponents:
    if component.name == "VEVENT":
        event = Event.from_ical(component.to_ical())
        print("Event:", event['SUMMARY'])
        print("Start time:", event['DTSTART'].dt)
        print("End time:", event['DTEND'].dt)