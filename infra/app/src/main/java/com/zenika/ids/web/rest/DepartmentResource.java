package com.zenika.ids.web.rest;

import com.zenika.ids.domain.Department;
import com.zenika.ids.service.DepartmentService;
import com.zenika.ids.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.zenika.ids.domain.Department}.
 */
@RestController
@RequestMapping("/api")
public class DepartmentResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentResource.class);

    private static final String ENTITY_NAME = "department";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DepartmentService departmentService;

    public DepartmentResource(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    /**
     * {@code POST  /departments} : Create a new department.
     *
     * @param department the department to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new department, or with status {@code 400 (Bad Request)} if the department has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@Valid @RequestBody Department department) throws URISyntaxException {
        log.debug("REST request to save Department : {}", department);
        if (department.getId() != null) {
            throw new BadRequestAlertException("A new department cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Department result = departmentService.save(department);
        return ResponseEntity.created(new URI("/api/departments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /departments} : Updates an existing department.
     *
     * @param department the department to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated department,
     * or with status {@code 400 (Bad Request)} if the department is not valid,
     * or with status {@code 500 (Internal Server Error)} if the department couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/departments")
    public ResponseEntity<Department> updateDepartment(@Valid @RequestBody Department department) throws URISyntaxException {
        log.debug("REST request to update Department : {}", department);
        if (department.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Department result = departmentService.save(department);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, department.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /departments} : get all the departments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of departments in body.
     */
    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        log.debug("REST request to get all Departments");
        return departmentService.findAll();
    }

    /**
     * {@code GET  /departments/:id} : get the "id" department.
     *
     * @param id the id of the department to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the department, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartment(@PathVariable Long id) {
        log.debug("REST request to get Department : {}", id);
        Optional<Department> department = departmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(department);
    }

    /**
     * {@code DELETE  /departments/:id} : delete the "id" department.
     *
     * @param id the id of the department to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        log.debug("REST request to delete Department : {}", id);
        departmentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
