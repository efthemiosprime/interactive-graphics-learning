/**
 * AssetLoader Module - Load and Manage Images, Textures, and Other Assets
 * 
 * This module provides:
 * - Image loading with promises
 * - Asset caching
 * - Loading progress tracking
 * - Error handling
 * - Sprite sheet support
 */

export class AssetLoader {
  constructor() {
    this.assets = new Map();
    this.loadingPromises = new Map();
    this.loadProgress = {
      total: 0,
      loaded: 0,
      failed: 0
    };
  }

  /**
   * Load a single image
   * @param {string} name - Asset name/key
   * @param {string} src - Image source URL
   * @returns {Promise<Image>} Promise that resolves with loaded image
   */
  loadImage(name, src) {
    // Return cached asset if already loaded
    if (this.assets.has(name)) {
      return Promise.resolve(this.assets.get(name));
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(name)) {
      return this.loadingPromises.get(name);
    }

    // Create new loading promise
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.assets.set(name, img);
        this.loadingPromises.delete(name);
        this.loadProgress.loaded++;
        resolve(img);
      };

      img.onerror = () => {
        this.loadingPromises.delete(name);
        this.loadProgress.failed++;
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });

    this.loadingPromises.set(name, promise);
    this.loadProgress.total++;
    return promise;
  }

  /**
   * Load multiple images
   * @param {Object} assets - Object with name:src pairs
   * @returns {Promise<Object>} Promise that resolves with all loaded assets
   */
  async loadImages(assets) {
    const entries = Object.entries(assets);
    const promises = entries.map(([name, src]) => 
      this.loadImage(name, src).then(img => [name, img])
    );

    try {
      const loaded = await Promise.all(promises);
      const result = {};
      loaded.forEach(([name, img]) => {
        result[name] = img;
      });
      return result;
    } catch (error) {
      console.error('Error loading images:', error);
      throw error;
    }
  }

  /**
   * Get loaded asset
   * @param {string} name - Asset name
   * @returns {Image|null} Loaded image or null if not found
   */
  get(name) {
    return this.assets.get(name) || null;
  }

  /**
   * Check if asset is loaded
   * @param {string} name - Asset name
   * @returns {boolean} True if asset is loaded
   */
  has(name) {
    return this.assets.has(name);
  }

  /**
   * Get loading progress (0 to 1)
   * @returns {number} Progress from 0 to 1
   */
  getProgress() {
    if (this.loadProgress.total === 0) return 1;
    return this.loadProgress.loaded / this.loadProgress.total;
  }

  /**
   * Get loading status
   * @returns {Object} Loading status object
   */
  getStatus() {
    return {
      ...this.loadProgress,
      progress: this.getProgress(),
      isLoading: this.loadingPromises.size > 0
    };
  }

  /**
   * Clear all assets
   */
  clear() {
    this.assets.clear();
    this.loadingPromises.clear();
    this.loadProgress = {
      total: 0,
      loaded: 0,
      failed: 0
    };
  }

  /**
   * Remove specific asset
   * @param {string} name - Asset name
   */
  remove(name) {
    this.assets.delete(name);
  }
}

