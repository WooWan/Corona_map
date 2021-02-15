
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from map import views

router= routers.DefaultRouter()
#api 와 연결
router.register('patients', views.PatientsView, 'Patients')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('map.urls')),
    path('api/', include(router.urls)),
]
