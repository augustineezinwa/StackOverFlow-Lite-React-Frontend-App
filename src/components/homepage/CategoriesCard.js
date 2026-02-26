import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BASE = process.env.APP_BASE_URL || '';

const CATEGORY_ICONS = {
  technology: 'fa-laptop-code',
  tech: 'fa-laptop-code',
  science: 'fa-flask',
  sports: 'fa-futbol',
  music: 'fa-music',
  art: 'fa-palette',
  business: 'fa-briefcase',
  health: 'fa-heartbeat',
  education: 'fa-graduation-cap',
  travel: 'fa-plane',
  food: 'fa-utensils',
  fashion: 'fa-tshirt',
  algorithms: 'fa-project-diagram',
  cars: 'fa-car',
  llm: 'fa-brain',
  radios: 'fa-broadcast-tower',
  webdevelopment: 'fa-code',
  web: 'fa-globe',
  wwii: 'fa-history',
  ww2: 'fa-history',
  worldwarii: 'fa-history',
  worldwar2: 'fa-history',
  history: 'fa-history',
  default: 'fa-folder'
};

function getIconForCategory(category) {
  if (!category) return CATEGORY_ICONS.default;
  const raw = (category.name || category.slug || '').toLowerCase();
  const name = raw.replace(/\s+/g, '').replace(/-/g, '');
  const slug = (category.slug || '').toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
  return (
    CATEGORY_ICONS[raw] ||
    CATEGORY_ICONS[name] ||
    CATEGORY_ICONS[slug] ||
    CATEGORY_ICONS.default
  );
}

class CategoriesCard extends Component {
  state = {
    categories: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    fetch(`${BASE}/categories`)
      .then((res) => res.json())
      .then((data) => {
        const list =
          data.data && Array.isArray(data.data.categories)
            ? data.data.categories
            : Array.isArray(data.data)
              ? data.data
              : Array.isArray(data.categories)
                ? data.categories
                : [];
        this.setState({ categories: list, loading: false, error: null });
      })
      .catch((err) => {
        this.setState({
          categories: [],
          loading: false,
          error: err.message || 'Failed to load categories'
        });
      });
  }

  render() {
    const { categories, loading, error } = this.state;
    const { selectedCategory, onSelectCategory, onResetCategory } = this.props;

    return (
      <aside className="categories-card sidebar-card" aria-label="Categories">
        <div className="sidebar-card-inner categories-card-inner">
          <div className="sidebar-card-header">
            <i className="fas fa-layer-group categories-card-icon" aria-hidden="true" />
            <h3 className="sidebar-card-title">Categories</h3>
          </div>
          <div className="categories-card-list">
            {loading && (
              <p className="sidebar-card-empty">
                <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Loading…
              </p>
            )}
            {error && !loading && (
              <p className="sidebar-card-empty">{error}</p>
            )}
            {!loading && !error && categories.length === 0 && (
              <p className="sidebar-card-empty">No categories yet.</p>
            )}
            {!loading && categories.length > 0 && (
              <>
                <ul className="categories-list">
                  {categories.map((cat) => {
                    const icon = getIconForCategory(cat);
                    const name = cat.name || cat.title || cat.slug || 'Category';
                    const slug = cat.slug || cat.name || cat.title || '';
                    const isSelected =
                      selectedCategory != null &&
                      (slug === selectedCategory || name === selectedCategory);
                    return (
                      <li key={cat.id || name} className="categories-item-wrapper">
                        <button
                          type="button"
                          className={`categories-item ${isSelected ? 'categories-item--selected' : ''}`}
                          onClick={() => onSelectCategory(cat)}
                          aria-pressed={isSelected}
                        >
                          <i className={`fas ${icon} categories-item-icon`} aria-hidden="true" />
                          <span className="categories-item-name">{name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {selectedCategory && (
                  <button
                    type="button"
                    className="categories-reset-cta"
                    onClick={onResetCategory}
                  >
                    Clear filter
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    );
  }
}

CategoriesCard.defaultProps = {
  selectedCategory: null,
  onSelectCategory: () => {},
  onResetCategory: () => {}
};

CategoriesCard.propTypes = {
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func,
  onResetCategory: PropTypes.func
};

export default CategoriesCard;
