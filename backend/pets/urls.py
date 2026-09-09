from django.urls import path

from .views import PetsListCreateView, PetDetailView


urlpatterns = [
    path("", PetsListCreateView.as_view(), name="pet-list-create"),
    path("<int:pk>/", PetDetailView.as_view(), name="pet-detail"),
]