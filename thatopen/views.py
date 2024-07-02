from django.shortcuts import render


def test_thatopen(request):
    return render(request, 'thatopen.html')

