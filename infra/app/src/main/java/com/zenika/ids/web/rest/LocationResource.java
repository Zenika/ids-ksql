package com.zenika.ids.web.rest;

import com.zenika.ids.domain.Location;
import com.zenika.ids.service.LocationService;
import com.zenika.ids.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.zenika.ids.domain.Location}.
 */
@RestController
@RequestMapping("/api")
public class LocationResource {

    private final Logger log = LoggerFactory.getLogger(LocationResource.class);

    private static final String ENTITY_NAME = "location";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocationService locationService;

    public LocationResource(LocationService locationService) {
        this.locationService = locationService;
    }

    /**
     * {@code POST  /locations} : Create a new location.
     *
     * @param location the location to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new location, or with status {@code 400 (Bad Request)} if the location has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/locations")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) throws URISyntaxException {
        log.debug("REST request to save Location : {}", location);
        if (location.getId() != null) {
            throw new BadRequestAlertException("A new location cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Location result = locationService.save(location);
        return ResponseEntity.created(new URI("/api/locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /locations} : Updates an existing location.
     *
     * @param location the location to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated location,
     * or with status {@code 400 (Bad Request)} if the location is not valid,
     * or with status {@code 500 (Internal Server Error)} if the location couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/locations")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location) throws URISyntaxException {
        log.debug("REST request to update Location : {}", location);
        if (location.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Location result = locationService.save(location);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, location.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /locations} : get all the locations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of locations in body.
     */
    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        log.debug("REST request to get all Locations");
        return locationService.findAll();
    }

    /**
     * {@code GET  /locations/:id} : get the "id" location.
     *
     * @param id the id of the location to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the location, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/locations/{id}")
    public ResponseEntity<Location> getLocation(@PathVariable Long id) {
        log.debug("REST request to get Location : {}", id);
        Optional<Location> location = locationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(location);
    }

    /**
     * {@code DELETE  /locations/:id} : delete the "id" location.
     *
     * @param id the id of the location to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/locations/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        log.debug("REST request to delete Location : {}", id);
        locationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
