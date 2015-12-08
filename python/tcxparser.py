"Simple parser for Garmin TCX files."

import time
from lxml import objectify

namespace = 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2'

class TCXParser:

    def __init__(self, tcx_file):
        tree = objectify.parse(tcx_file)
        self.root = tree.getroot()
        self.activity = self.root.Activities.Activity

    @property
    def hr_values(self):
        return [x.text for x in self.root.xpath('//ns:HeartRateBpm/ns:Value', namespaces={'ns': namespace})]

    @property
    def distance_values(self):
        return [x.text for x in self.root.xpath('//ns:DistanceMeters', namespaces={'ns': namespace})]

    @property
    def elevation_values(self):
        return [x.text for x in self.root.xpath('//ns:AltitudeMeters', namespaces={'ns': namespace})]

    @property
    def time_values(self):
        return [x.text for x in self.root.xpath('//ns:Time', namespaces={'ns': namespace})]

    @property
    def latitude(self):
        return self.activity.Lap.Track.Trackpoint.Position.LatitudeDegrees.pyval

    @property
    def longitude(self):
        return self.activity.Lap.Track.Trackpoint.Position.LongitudeDegrees.pyval

    @property
    def activity_type(self):
        return self.activity.attrib['Sport'].lower()

    @property
    def completed_at(self):
        return self.activity.Lap[-1].Track.Trackpoint[-1].Time.pyval

    @property
    def distance(self):
        return self.activity.Lap[-1].Track.Trackpoint[-2].DistanceMeters.pyval

    @property
    def distancetest(self):
        return  sum(lap.DistanceMeters.pyval for lap in self.activity.Lap)

    @property
    def distance_units(self):
        return 'meters'

    @property
    def duration(self):
        """Returns duration of workout in seconds."""
        return sum(lap.TotalTimeSeconds for lap in self.activity.Lap)

    @property
    def calories(self):
        return sum(lap.Calories for lap in self.activity.Lap)

    @property
    def hr_avg(self):
        """Average heart rate of the workout"""
        hr_data = self.hr_values()
        return sum(hr_data)/len(hr_data)

    @property
    def hr_max(self):
        """Minimum heart rate of the workout"""
        return max(self.hr_values())

    @property
    def hr_min(self):
        """Minimum heart rate of the workout"""
        return min(self.hr_values())

    @property
    def pace(self):
        """Average pace (mm:ss/km for the workout"""
        secs_per_km = self.duration/(self.distance/1000)
        return time.strftime('%M:%S', time.gmtime(secs_per_km))

#tcx = TCXParser('/home/pierremtb/traininglink-uploader/out.tcx')
#print(len(tcx.hr_values))
#print(len(tcx.distance_values))
#print(len(tcx.elevation_values))