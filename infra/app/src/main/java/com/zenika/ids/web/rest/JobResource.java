package com.zenika.ids.web.rest;

import com.zenika.ids.domain.Job;
import com.zenika.ids.repository.JobRepository;
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
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.zenika.ids.domain.Job}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class JobResource {

    private final Logger log = LoggerFactory.getLogger(JobResource.class);

    private static final String ENTITY_NAME = "job";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JobRepository jobRepository;

    public JobResource(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    /**
     * {@code POST  /jobs} : Create a new job.
     *
     * @param job the job to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new job, or with status {@code 400 (Bad Request)} if the job has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@RequestBody Job job) throws URISyntaxException {
        log.debug("REST request to save Job : {}", job);
        if (job.getId() != null) {
            throw new BadRequestAlertException("A new job cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Job result = jobRepository.save(job);
        return ResponseEntity.created(new URI("/api/jobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /jobs} : Updates an existing job.
     *
     * @param job the job to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated job,
     * or with status {@code 400 (Bad Request)} if the job is not valid,
     * or with status {@code 500 (Internal Server Error)} if the job couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/jobs")
    public ResponseEntity<Job> updateJob(@RequestBody Job job) throws URISyntaxException {
        log.debug("REST request to update Job : {}", job);
        if (job.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Job result = jobRepository.save(job);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, job.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /jobs} : get all the jobs.
     *

     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jobs in body.
     */
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Jobs");
        Page<Job> page;
        if (eagerload) {
            page = jobRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = jobRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /jobs/:id} : get the "id" job.
     *
     * @param id the id of the job to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the job, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        log.debug("REST request to get Job : {}", id);
        Optional<Job> job = jobRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(job);
    }

    /**
     * {@code DELETE  /jobs/:id} : delete the "id" job.
     *
     * @param id the id of the job to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        log.debug("REST request to delete Job : {}", id);
        jobRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
