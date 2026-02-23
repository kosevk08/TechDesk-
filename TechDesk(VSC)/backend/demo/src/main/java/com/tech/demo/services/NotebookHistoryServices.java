package com.tech.demo.services;

import com.tech.demo.other.NotebookHistory;

import java.util.List;

public interface NotebookHistoryService {

    List<NotebookHistory> getAllHistory();

    List<NotebookHistory> getHistoryByNotebookId(Long notebookId);

    NotebookHistory saveNotebookHistory(NotebookHistory history);

    void deleteHistoryRecord(Long historyId);
}