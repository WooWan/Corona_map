from django.db import models

class Patients(models.Model):
	place= models.CharField(max_length=100)
	date=models.DateField()
	coordinate_y=models.FloatField(null=True)
	coordinate_x = models.FloatField(null=True)

	def __str__(self):
		return self.place
