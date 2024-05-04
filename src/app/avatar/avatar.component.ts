import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MatIconModule, NgIf, NgFor, MatButtonModule, MatCheckboxModule, MatListModule, FormsModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  avatar : string = "AUTRUCHE";
  avatars : string[] = [
    "AUTRUCHE", 
    "CHAUVE_SOURIS",
    "ELEPHANT",
    "HIBOU",
    "LAPIN",
    "LEOPARD",
    "MORSE",
    "ORNITHORYNQUE",
    "PANDA_ROUX",
    "PINGOUIN",
    "SANGLIER",
    "ZEBRE"]
  avatarVisible: boolean = false;
  selected!: string;

  getAvatarPath(avatar: string): string {
    return "../assets/Avatar-pikisuperstar/"+avatar+".svg";
  }

  changerAvatar() {
    this.avatarVisible = true;
  }
  
  selectAvatar(avatar: string) {
    this.avatar = avatar;
    this.avatarVisible = false;
  }
}
