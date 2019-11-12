package com.zenika.ids.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.zenika.ids.web.rest.TestUtil;

public class JobHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobHistory.class);
        JobHistory jobHistory1 = new JobHistory();
        jobHistory1.setId(1L);
        JobHistory jobHistory2 = new JobHistory();
        jobHistory2.setId(jobHistory1.getId());
        assertThat(jobHistory1).isEqualTo(jobHistory2);
        jobHistory2.setId(2L);
        assertThat(jobHistory1).isNotEqualTo(jobHistory2);
        jobHistory1.setId(null);
        assertThat(jobHistory1).isNotEqualTo(jobHistory2);
    }
}
