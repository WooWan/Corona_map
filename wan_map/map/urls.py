from . import views
from django.urls import path, include


urlpatterns = [
	path('', views.map, name='map'),
	path('patients_admin', views.patients_admin, name='patients_admin')
]
