import { Component, OnInit } from '@angular/core';
import { Goal } from './goal.model';
import { GoalsService } from './goals.service';
import { NavigationPaneItem } from '../shared/components/navigation-pane/navigation-pane.component';

@Component({
    selector: 'm-goals',
    templateUrl: './goals.component.html',
    styleUrls: ['./goals.component.less']
})

export class GoalsComponent implements OnInit {
    canCreate: boolean = true;
    canEdit: boolean = false;
    canDelete: boolean = false;
    selectedGoal: Goal = null;

    goals: Goal[];
    goalsSorted: Goal[];
    goalsLength: number;

    filters: NavigationPaneItem[];

    constructor(private goalsService: GoalsService) {
    }

    ngOnInit() {
        this.goalsService.getGoals().then(goals => {
            this.goals = goals;
            this.goalsSorted = this.goals.sort((a, b) => (a.title > b.title) ? 1 : -1);
            this.goalsLength = this.goals.length;
        });

        this.filters = [
            {
                id: 'all',
                title: 'Все',
                selected: true
            },
            {
                id: 'active',
                title: 'Активные',
            },
            {
                id: 'completed',
                title: 'Завершенные',
            }
        ];
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param id
     */
    onNavigationPaneItemChange(id: string) {
        switch (id) {
            case 'all':
                this.goalsSorted = this.goals;
                break;
            case 'active':
                this.goalsSorted = this.goals.filter(goal => goal.amount > goal.current);
                break;
            case 'completed':
                this.goalsSorted = this.goals.filter(goal => goal.amount == goal.current);
                break;
        }

        this.canEdit = false;
        this.canDelete = false;

        this.goalsLength = this.goalsSorted.length;
    }

    /**
     * Handles NavigationPane's item change
     *
     * @param item
     */
    onListViewItemChange(Goal: Goal) {
        this.canEdit = true;
        this.canDelete = true;

        this.selectedGoal = Goal;
    }

    /**
     * Handler for the toolbutton Create
     */
    onToolButtonCreateClick(event: any) {
        console.log(event);
    }

    /**
     * Handler for the toolbutton Edit
     */
    onToolButtonEditClick(event: any) {
        console.log(event);
    }

    /**
     * Handler for the toolbutton Delete
     */
    onToolButtonDeleteClick(event: any) {
        // TODO: Maybe we need to select next Goal, after deleting current one

        this.goals = this.goals.filter(Goal => Goal.id !== this.selectedGoal.id);
        //this.goalsSorted = this.filterGoalsByType(this.selectedGoalType);

        this.selectedGoal = null;

        this.canEdit = false;
        this.canDelete = false;
    }
}