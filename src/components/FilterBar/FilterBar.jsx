import React from "react";
import classes from "./FilterBar.module.css";

const FilterBar = ({ filters, setFilters, themes }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className={classes['filter-bar']}>

      <div className={classes['filter-item']}>
        <label>Difficulté:</label>
        <select name="difficulty" value={filters.difficulty} onChange={handleChange}>
          <option value="">Toutes</option>
          <option value="Facile">Facile</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Difficile">Difficile</option>
          <option value="Sportif">Sportif</option>
        </select>
      </div>

      <div className={classes['filter-item']}>
        <label>Durée:</label>
        <select name="duration" value={filters.duration} onChange={handleChange}>
          <option value="">Toutes</option>
          <option value="courte">Moins de 1h</option>
          <option value="moyenne">1h à 3h</option>
          <option value="longue">3h à 6h</option>
          <option value="extralongue">Plus de 6h</option>
        </select>
      </div>

      <div className={classes['filter-item']}>
        <label>Distance:</label>
        <select name="distance" value={filters.distance} onChange={handleChange}>
            <option value="">Toutes</option>
            <option value="courte">0-5 km</option>
            <option value="moyenne">5-10 km</option>
            <option value="longue">10-15 km</option>
            <option value="extralongue">15+ km</option>
        </select>
      </div>

    </div>
  );
};

export default FilterBar;