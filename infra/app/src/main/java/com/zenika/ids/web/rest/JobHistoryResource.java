package com.zenika.ids.web.rest;

import com.zenika.ids.domain.JobHistory;
import com.zenika.ids.service.JobHistoryService;
import com.zenika.ids.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.zenika.ids.domain.JobHistory}.
 */
@RestController
@RequestMapping("/api")
public class JobHistoryResource {

    private final Logger log = LoggerFactory.getLogger(JobHistoryResource.class);

    private static final String ENTITY_NAME = "jobHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JobHistoryService jobHistoryService;

    public JobHistoryResource(JobHistoryService jobHistoryService) {
        this.jobHistoryService = jobHistoryService;
    }

    /**
     * {@code POST  /job-histories} : Create a new jobHistory.
     *
     * @param jobHistory the jobHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jobHistory, or with status {@code 400 (Bad Request)} if the jobHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/job-histories")
    public ResponseEntity<JobHistory> createJobHistory(@RequestBody JobHistory jobHistory) throws URISyntaxException {
        log.debug("REST request to save JobHistory : {}", jobHistory);
        if (jobHistory.getId() != null) {
            throw new BadRequestAlertException("A new jobHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobHistory result = jobHistoryService.save(jobHistory);
        return ResponseEntity.created(new URI("/api/job-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /job-histories} : Updates an existing jobHistory.
     *
     * @param jobHistory the jobHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jobHistory,
     * or with status {@code 400 (Bad Request)} if the jobHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jobHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/job-histories")
    public ResponseEntity<JobHistory> updateJobHistory(@RequestBody JobHistory jobHistory) throws URISyntaxException {
        log.debug("REST request to update JobHistory : {}", jobHistory);
        if (jobHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JobHistory result = jobHistoryService.save(jobHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, jobHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /job-histories} : get all the jobHistories.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jobHistories in body.
     */
    @GetMapping("/job-histories")
    public ResponseEntity<List<JobHistory>> getAllJobHistories(Pageable pageable) {
        log.debug("REST request to get a page of JobHistories");
        Page<JobHistory> page = jobHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /job-histories/:id} : get the "id" jobHistory.
     *
     * @param id the id of the jobHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jobHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/job-histories/{id}")
    public ResponseEntity<JobHistory> getJobHistory(@PathVariable Long id) {
        log.debug("REST request to get JobHistory : {}", id);
        Optional<JobHistory> jobHistory = jobHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jobHistory);
    }

    /**
     * {@code DELETE  /job-histories/:id} : delete the "id" jobHistory.
     *
     * @param id the id of the jobHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/job-histories/{id}")
    public ResponseEntity<Void> deleteJobHistory(@PathVariable Long id) {
        log.debug("REST request to delete JobHistory : {}", id);
        jobHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
