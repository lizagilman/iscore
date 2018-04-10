from django.http import HttpResponse

def someFunction(a):
    print("a:", a)

def test1(request):
    schedule_generate([["liza", "daniel"],["mike","alisa"]],1)
    return HttpResponse("ok")


def schedule_generate(match_list,num_of_courts):


        game_duration=1
        rest_time=30

        index=0

        schedule=[]

        while(index<len(match_list)):
            for i in range(0,num_of_courts):
                if (index + i < len(match_list)):
                    schedule.append(match_time("2018","4","10","17",match_list[index]))
                    print(schedule[index].match)
                    index+=1







class match_time:
    year=""
    month=""
    day=""
    hour=""
    match=[]

    def __init__(self,year,month,day,hour,match):
        self.day=day
        self.month = month
        self.year = year
        self.hour = hour
        self.match = match

def make_day(match_list):

    print ("test")