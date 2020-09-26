import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GanttComponent} from 'src/app/gantt/ui/gantt.component';
import {GanttBarComponent} from 'src/app/gantt/ui/gantt-bar/gantt-bar.component';
import {GanttAggregateService} from 'src/app/gantt/domain/gantt-aggregate/gantt-aggregate.service';
import {GanttSceneAggregateService} from 'src/app/gantt/domain/gantt-scene-aggregate/gantt-scene-aggregate.service';
import {GanttSceneComponent} from 'src/app/gantt/ui/gantt-scene/gantt-scene.component';


@NgModule({
  declarations: [GanttComponent, GanttBarComponent, GanttSceneComponent],
  providers: [GanttAggregateService, GanttSceneAggregateService],
  imports: [
    CommonModule
  ],
  exports: [GanttComponent]
})
export class GanttModule {
}
