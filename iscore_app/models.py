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
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=6)
    nationality = models.CharField(max_length=50)
    date = models.DateField(null=True)

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
    points = models.OneToOneField(
        Points_Distribution_Methods,
        on_delete=models.CASCADE,
        null=True,
        blank=True)
    money = models.OneToOneField(
        Money_Distribution_Methods,
        on_delete=models.CASCADE,
        null=True,
        blank=True)

    def __str__(self):
        return self.name


class Organizations(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    points_list = models.ManyToManyField(
        Points_Distribution_Methods, null=True, blank=True)
    money_list = models.ManyToManyField(
        Money_Distribution_Methods, null=True, blank=True)

    def __str__(self):
        return self.name


class Ranking_Lists(models.Model):
    organization = models.ForeignKey(Organizations, on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=300)
    grades = models.ManyToManyField(
        Grades, null=True, blank=True
    )  #also creates the joining table between Ranking_List and Grade(Rules Table)

    def __str__(self):
        return self.name


class Rankings_list_catagories(models.Model):
    list = models.ForeignKey(Ranking_Lists, on_delete=models.CASCADE)
    category = models.ForeignKey(Catagories, on_delete=models.DO_NOTHING)
    player = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, null=True, blank=True)
    points = models.IntegerField(default=0)
    rank = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.list.name


class Tournaments(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    field_of_sport = models.CharField(max_length=300)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING, null=True, blank=True)
    is_ranked = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    grade = models.ForeignKey(
        Grades, on_delete=models.DO_NOTHING, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    registration_start_date = models.DateField(null=True, blank=True)
    registration_end_date = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=300, null=True, blank=True)
    status = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.name


class Draws(models.Model):
    tournamet = models.ForeignKey(Tournaments, on_delete=models.CASCADE)
    category = models.CharField(max_length=300)
    player_list = models.ManyToManyField(Players, null=True, blank=True)


class Matches(models.Model):
    player1 = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, related_name="%(class)s_player1")
    player2 = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, related_name="%(class)s_player2")
    winner = models.ForeignKey(
        Players,
        on_delete=models.DO_NOTHING,
        related_name="%(class)s_winner",
        null=True,
        blank=True)
    stage = models.CharField(max_length=300, blank=True)
    time = models.DateField(null=True, blank=True)
    draws = models.ForeignKey(Draws, on_delete=models.CASCADE)

    def __str__(self):
        return 'match id : %d , set id: %d , game id:%d' (
            self.match_id, self.set_id, self.game_id)


class Sets(models.Model):
    player1_score = models.IntegerField(db_index=True, default=0)
    player2_score = models.IntegerField(default=0)
    matches = models.ForeignKey(Matches, on_delete=models.CASCADE)


class Games(models.Model):
    player1_score = models.IntegerField(db_index=True, default=0)
    player2_score = models.IntegerField(default=0)
    set = models.ForeignKey(Sets, on_delete=models.CASCADE)


class Tournament_Managers(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    tournaments = models.ManyToManyField(Tournaments, null=True, blank=True)

    def __str__(self):
        return self.name


class Coach(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    player_list = models.ManyToManyField(Players, null=True, blank=True)
