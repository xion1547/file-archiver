package com.filearchiver.file;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource()
public interface FileRepository extends PagingAndSortingRepository<File, Long> {
    List<File> findAllByFilePath(@Param("filePath") List<String> filePath);
    void deleteFileByIdEquals(Long id);
}
