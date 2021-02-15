from django.shortcuts import render
from .forms import SearchForm
import requests
from rest_framework import viewsets     
from .serializers import PatientsSerializer
from .models import Patients

class PatientsView(viewsets.ModelViewSet):
	serializer_class=PatientsSerializer
	queryset=Patients.objects.all()

def map(request):
	if request.method=='POST':
		form= SearchForm(request.POST)
		#검색을 해야한다,,
		if form.is_valid():
			search_value= form.cleaned_data['search_value']
	elif request.method=="GET":
		form= SearchForm()

	return render(request, 'map/kakao_map.html', {'form': form})

def patients_admin(request):
	if request.method=='POST':
		form= SearchForm(request.POST)
		if form.is_valid():
			search_value= form.cleaned_data['search_value']
	elif request.method=="GET":
		form= SearchForm()
	return render(request, 'map/kakao_map.html', {'form': form})
# def add_location(request):
# 	pass

# def delete_location(request):
# 	pass