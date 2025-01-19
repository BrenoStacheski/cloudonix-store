import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { STRING_EMPTY } from '../../../../../shared/constants/string-consts';

@Component({
  selector: 'app-product-profile-editor',
  templateUrl: './product-profile-editor.component.html',
  styleUrls: ['./product-profile-editor.component.scss'],
})
export class ProductProfileEditorComponent implements OnInit, OnChanges {
  @Input() profile: {
    type?: 'furniture' | 'equipment' | 'stationary' | 'part';
    available?: boolean;
    backlog?: number | null;
    customProperties?: { [key: string]: string };
  } = {};
  @Input() populatedProfile: any;

  @Output() profileChange = new EventEmitter<typeof this.profile>();

  typeOptions = ['furniture', 'equipment', 'stationary', 'part'];
  customKeys: string[] = [];
  newKey = STRING_EMPTY;
  newValue = STRING_EMPTY;
  editingKey: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['populatedProfile']?.currentValue) {
      this.profile = changes['populatedProfile']?.currentValue;
    }
  }

  ngOnInit(): void {
    this.profile.type = this.profile.type || 'furniture';
    this.profile.available = this.profile.available ?? true;
    this.profile.backlog = this.profile.backlog ?? null;

    this.profile.customProperties = this.profile.customProperties || {};
    this.updateCustomKeys();
  }

  objectToStringArray(customProperties: { [key: string]: string }): string[] {
    return Object.entries(customProperties).map(([key, value]) => `${key}: ${value}`);
  }

  onProfileChange(): void {
    this.updateCustomKeys();
    this.profileChange.emit(this.profile);
  }

  addCustomProperty(): void {
    if (this.newKey && !this.profile.customProperties?.[this.newKey]) {
      this.profile.customProperties = {
        ...this.profile.customProperties,
        [this.newKey]: this.newValue,
      };
      this.newKey = STRING_EMPTY;
      this.newValue = STRING_EMPTY;
      this.editingKey = null;
      this.onProfileChange();
    }
  }

  setKeyValues(key: string, value: string): void {
    this.newKey = key;
    this.newValue = value;
    this.editingKey = key;
  }

  saveEditedProperty(): void {
    if (this.editingKey && this.newKey && this.profile.customProperties) {
      if (this.editingKey !== this.newKey) {
        delete this.profile.customProperties[this.editingKey];
      }
      this.profile.customProperties[this.newKey] = this.newValue;
      this.newKey = STRING_EMPTY;
      this.newValue = STRING_EMPTY;
      this.editingKey = null;
      this.onProfileChange();
    }
  }

  deleteCustomProperty(key: string): void {
    if (this.profile.customProperties) {
      delete this.profile.customProperties[key];
      this.onProfileChange();
    }
  }

  private updateCustomKeys(): void {
    this.customKeys = Object.keys(this.profile.customProperties || {});
  }
}
