from django import forms


class SearchForm(forms.Form):
	search_key= forms.CharField(label="" ,max_length=20,  widget=forms.TextInput(attrs={'placeholder': '목적지를 입력해주세요'}))