from rest_framework import serializers
from .models import Patients

class PatientsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Patients
		fields = ('id', 'place', 'date','coordinate_y', 'coordinate_x', 'phone')