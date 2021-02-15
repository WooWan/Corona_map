from django.contrib import admin
from .models import Patients


class PatientsAdmin(admin.ModelAdmin):
	list_display=('place', 'date', 'coordinate_y', 'coordinate_x')

admin.site.register(Patients, PatientsAdmin)
