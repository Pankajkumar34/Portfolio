import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '📄',
  },
  sectionName: {
    type: String,
    required: true,
  },
  sectionType: {
    type: String,
    enum: ['hero', 'profile', 'experience', 'skills', 'companies', 'custom', 'dropdown'],
    default: 'custom',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  // For hierarchical menu structure
  parentId: {
    type: String,
    default: null,
  },
  isDropdown: {
    type: Boolean,
    default: false,
  },
});

const menuSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'dashboard_menu',
  },
  items: [menuItemSchema],
}, { timestamps: true });

export default mongoose.models.MenuSetting || mongoose.model("MenuSetting", menuSettingSchema);
