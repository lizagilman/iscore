# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.postgres.fields import ArrayField


class Catagories(models.Model):
    name = models.CharField(db_index=True, max_length=300)

    def __str__(self):
        return self.name


class Players(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    age = models.IntegerField()
    gender = models.CharField(max_length=1)
    nationality = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Money_Distribution_Methods(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    distribution = ArrayField(models.IntegerField(default=0))

    def __str__(self):
        return self.name


class Points_Distribution_Methods(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    distribution = ArrayField(models.IntegerField(default=0))

    def __str__(self):
        return self.name


class Grades(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    points = models.ForeignKey(
        Points_Distribution_Methods, on_delete=models.CASCADE)
    money = models.ForeignKey(
        Money_Distribution_Methods, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Ranking_Lists(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    grades = models.ManyToManyField(
        Grades
    )  #also creates the joining table between Ranking_List and Grade(Rules Table)

    def __str__(self):
        return self.name


class Rankings_list_catagories(models.Model):
    list = models.ForeignKey(Ranking_Lists, on_delete=models.CASCADE)
    catagory = models.ForeignKey(Catagories, on_delete=models.DO_NOTHING)
    player = models.ForeignKey(Players, on_delete=models.DO_NOTHING)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.list.name


class Organizations(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    ranking_lists = models.ManyToManyField(Ranking_Lists)
    points_list = models.ManyToManyField(Points_Distribution_Methods)
    money_list = models.ManyToManyField(Money_Distribution_Methods)

    def __str__(self):
        return self.name


class Tournaments(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    field_of_sport = models.CharField(max_length=300)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING)
    is_ranked = models.IntegerField(default=0)
    grade = models.ForeignKey(Grades, on_delete=models.DO_NOTHING)
    start_date = models.DateField()
    end_date = models.DateField()
    registration_start_date = models.DateField()
    registration_end_date = models.DateField()
    address = models.CharField(max_length=300)
    status = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Matches(models.Model):
    match_num = models.IntegerField(db_index=True, default=1)
    set_num = models.IntegerField()
    game_num = models.IntegerField()
    player1 = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, related_name="%(class)s_player1")
    player1_score = models.IntegerField(default=0)
    player2 = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, related_name="%(class)s_player2")
    player2_score = models.IntegerField(default=0)

    def __str__(self):
        return 'match id : %d , set id: %d , game id:%d' (
            self.match_id, self.set_id, self.game_id)


class Draws(models.Model):
    tournament = models.ForeignKey(Tournaments, on_delete=models.DO_NOTHING)
    match = models.ManyToManyField(Matches)
    player1 = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, related_name='%(class)s_player1')
    player2 = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, related_name='%(class)s_player2')
    winner = models.CharField(max_length=300)
    catagory = models.CharField(max_length=300)
    stage = models.CharField(max_length=300)
    court = models.CharField(max_length=300)
    time = models.DateField()
    system_of_play = models.CharField(max_length=300)


class Tournament_Managers(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    tournaments = models.ManyToManyField(Tournaments)

    def __str__(self):
        return self.name


class Coach(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    player_list = models.ManyToManyField(Players)
