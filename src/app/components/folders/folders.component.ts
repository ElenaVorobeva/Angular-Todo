import { MyFolder } from '../../common/types';
import { FoldersService } from './../../services/folders.service';
import { NotFoundError } from '../../common/not-found-error';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
})
export class FoldersComponent implements OnInit {
  folders: any;
  newTitle!: string;
  id!: string;

  constructor(private service: FoldersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
    });
    this.service.getFolders().subscribe({
      next: (folders) => (this.folders = folders),
    });
  }

  createFolder(input: HTMLInputElement): void {
    let folder: any = {
      title: input.value,
      creationData: Date.now(),
    };
    this.folders.splice(0, 0, folder);
    input.value = '';

    this.service.create(folder).subscribe({
      next: (newFolder) => {
        folder.id = JSON.parse(JSON.stringify(newFolder)).id;
        folder.folder = JSON.parse(JSON.stringify(newFolder)).id;
      },
      error: (error) => {
        this.folders.splice(0, 1);
        throwError(() => error);
      },
    });
  }

  editFolder(folder: MyFolder): void {
    folder.isBeingEdited = true;
    this.newTitle = folder.title;
    console.log(folder);
  }

  saveFolder(folder: MyFolder): void {
    const oldTitle = folder.title;

    delete folder.isBeingEdited;
    folder.title = this.newTitle;

    if (folder.title !== oldTitle) {
      this.service.update(folder).subscribe({
        error: (error) => {
          folder.title = oldTitle;
          throwError(() => error);
        },
      });
    }
  }

  cancelEditingFolder(folder: MyFolder): void {
    folder.isBeingEdited = false;
  }

  deleteFolder(folder: MyFolder): void {
    let index = this.folders.indexOf(folder);
    this.folders.splice(index, 1);

    this.service.delete(folder.id).subscribe({
      error: (error) => {
        this.folders.splice(index, 0, folder);
        if (error instanceof NotFoundError)
          alert('This post has already been deleted.');
        else throwError(() => error);
      },
    });
  }

  setContent(event: any, task: MyFolder): void {
    event.target.setAttribute('data-after', task.title);
  }
}
