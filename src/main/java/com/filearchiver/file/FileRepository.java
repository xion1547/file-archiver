package com.filearchiver.file;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.lang.Nullable;

import java.util.List;

@RepositoryRestResource()
public interface FileRepository extends PagingAndSortingRepository<File, Long> {
    @Query("select f from File f where f.filePath like %?1% order by f.filePath")
    @Nullable
    List<File> findAllByFilePath(@Param("filePath") String filePath);
}
