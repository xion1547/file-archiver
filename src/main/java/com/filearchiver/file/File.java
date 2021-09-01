package com.filearchiver.file;

import javax.persistence.*;

@Entity
@Table(name = "file")
public class File {
    @Id
    @SequenceGenerator(name = "files_id_seq", sequenceName = "files_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "files_id_seq")
    private Long id;
    private String filePath;

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
