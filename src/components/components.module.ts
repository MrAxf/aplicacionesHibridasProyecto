import { NgModule } from '@angular/core';
import { MovieTileComponent } from './movie-tile/movie-tile';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [MovieTileComponent],
	imports: [CommonModule],
	exports: [MovieTileComponent]
})
export class ComponentsModule {}
