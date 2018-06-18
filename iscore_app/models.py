# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    is_coach = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_umpire = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)

    pass


class Organizations(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    field_of_sports = models.CharField(max_length=300)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class RankingListCategories(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (
            'name',
            'organization',
        )

    def __str__(self):
        return self.name


class Players(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=6)
    nationality = models.CharField(max_length=3)
    date = models.DateField(null=True)

    def __str__(self):
        return self.name


class Money_Distribution_Methods(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    distribution = ArrayField(models.IntegerField(default=0), size=7)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (
            'name',
            'organization',
        )

    def __str__(self):
        return self.name


class Points_Distribution_Methods(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    distribution = ArrayField(models.IntegerField(default=0), size=7)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (
            'name',
            'organization',
        )

    def __str__(self):
        return self.name


class Grades(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    points = models.OneToOneField(
        Points_Distribution_Methods,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True)
    money = models.OneToOneField(
        Money_Distribution_Methods,
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (
            'name',
            'organization',
        )

    def __str__(self):
        return self.name


class Ranking_Lists(models.Model):
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING)
    name = models.CharField(db_index=True, max_length=300)
    grades = models.ManyToManyField(
        Grades, null=True, blank=True
    )  # also creates the joining table between Ranking_List and Grade(Rules Table)
    updated_at = models.DateTimeField(default=timezone.now())
    categories = models.ManyToManyField(
        RankingListCategories, null=True, blank=True)

    class Meta:
        unique_together = (
            'organization',
            'name',
        )

    def __str__(self):
        return self.name


class RankedPlayers(models.Model):
    list = models.ForeignKey(Ranking_Lists, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(
        RankingListCategories, on_delete=models.DO_NOTHING)
    player = models.ForeignKey(
        Players, on_delete=models.DO_NOTHING, null=True, blank=True)
    points = models.IntegerField(default=0)
    rank = models.IntegerField(null=True, blank=True)
    tournaments_played = models.IntegerField(default=0)

    class Meta:
        unique_together = (
            'list',
            'category',
            'player',
        )

    def __str__(self):
        return 'ranking list: : %s , category: %s , player:%s  ,rank : %s ,points : %s' % (
            self.list.name, self.category.name, self.player.name, self.rank,
            self.points)


class Tournaments(models.Model):
    name = models.CharField(db_index=True, max_length=300)
    field_of_sport = models.CharField(max_length=300)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING, null=True, blank=True)
    is_ranked = models.BooleanField(default=False)
    ranking_list = models.ForeignKey(
        Ranking_Lists, on_delete=models.DO_NOTHING, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    grade = models.ForeignKey(
        Grades, on_delete=models.DO_NOTHING, null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    registration_start_date = models.DateTimeField(null=True, blank=True)
    registration_end_date = models.DateTimeField(null=True, blank=True)
    address = models.CharField(max_length=300, null=True, blank=True)
    status = models.CharField(max_length=300, null=True, blank=True)
    manager = models.ForeignKey(
        'Tournament_Managers', on_delete=models.CASCADE)
    has_schedule = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class TournamentCategories(models.Model):
    tournamet = models.ForeignKey(Tournaments, on_delete=models.CASCADE)
    category = models.CharField(max_length=300)
    player_list = models.ManyToManyField(
        Players,
        through='Entries',
        through_fields=('tournament_category', 'player'),
    )
    max_players = models.IntegerField(default=0)
    has_draw = models.BooleanField(default=False)

    def __str__(self):
        return self.category


class Matches(models.Model):
    player1 = models.ForeignKey(
        Players,
        on_delete=models.DO_NOTHING,
        related_name="%(class)s_player1",
        null=True,
        blank=True)
    player2 = models.ForeignKey(
        Players,
        on_delete=models.DO_NOTHING,
        related_name="%(class)s_player2",
        null=True,
        blank=True)
    winner = models.ForeignKey(
        Players,
        on_delete=models.DO_NOTHING,
        related_name="%(class)s_winner",
        null=True,
        blank=True)
    stage = models.CharField(max_length=300, blank=True)
    time = models.DateTimeField(null=True, blank=True)
    match_index = models.IntegerField(default=0)
    next_match = models.ForeignKey(
        'Matches', on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(
        TournamentCategories, on_delete=models.CASCADE)
    court = models.IntegerField(default=0)

    def __str__(self):
        return 'matach: p1: %s , p2: %s , stage:%s  ,category : %s' % (
            self.player1, self.player2, self.stage, self.category)


class Sets(models.Model):
    set_num = models.IntegerField(default=1)
    player1_score = models.IntegerField(db_index=True, default=0)
    player2_score = models.IntegerField(default=0)
    matches = models.ForeignKey(Matches, on_delete=models.CASCADE)


class Games(models.Model):
    game_num = models.IntegerField(default=1)
    player1_score = models.IntegerField(db_index=True, default=0)
    player2_score = models.IntegerField(default=0)
    set = models.ForeignKey(Sets, on_delete=models.CASCADE)

    def __str__(self):
        return 'game_num: %d p1: %d , p2: %d , set:%d  ' % (self.game_num,
                                                            self.player1_score,
                                                            self.player2_score,
                                                            self.set.id)


class Score(models.Model):
    match_id = models.ForeignKey(Matches, on_delete=models.CASCADE)
    current_set = models.IntegerField(default=1)
    current_game = models.IntegerField(default=1)
    p1_set1 = models.IntegerField(default=0)
    p2_set1 = models.IntegerField(default=0)
    p1_set2 = models.IntegerField(default=0)
    p2_set2 = models.IntegerField(default=0)
    p1_set3 = models.IntegerField(default=0)
    p2_set3 = models.IntegerField(default=0)
    p1_set4 = models.IntegerField(default=0)
    p1_set4 = models.IntegerField(default=0)
    p1_set5 = models.IntegerField(default=0)
    p2_set5 = models.IntegerField(default=0)
    p1_sets = models.IntegerField(default=0)
    p2_sets = models.IntegerField(default=0)
    p1_games = models.IntegerField(default=0)
    p2_games = models.IntegerField(default=0)
    p1_points = models.IntegerField(default=0)
    p2_points = models.IntegerField(default=0)

    def __str__(self):
        return 'game_num: %d p1: %d , p2: %d , set:%d  ' % (self.game_num,
                                                            self.player1_score,
                                                            self.player2_score,
                                                            self.set.id)


class Tournament_Managers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=300)

    def __str__(self):
        return self.name


class Coach(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=300)
    player_list = models.ManyToManyField(Players, null=True, blank=True)


class Umpires(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=300)
    organization = models.ForeignKey(
        Organizations, on_delete=models.DO_NOTHING, null=True, blank=True)


class Entries(models.Model):
    tournament_category = models.ForeignKey(
        TournamentCategories, on_delete=models.CASCADE, null=True, blank=True)
    player = models.ForeignKey(
        Players, on_delete=models.CASCADE, null=True, blank=True)
    is_seeded = models.BooleanField(default=False)
    rank = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = (
            'tournament_category',
            'player',
        )

    def __str__(self):
        return 'category: : %s , player: %s , rank:%s  ,seeded : %s ' % (
            self.tournament_category.category, self.player.name, self.rank,
            self.is_seeded)
