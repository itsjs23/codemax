<?php

class Paginator {
    private $_total;
    private $_perPage;
    private $_currentPage;
    private $_baseUrl;
    
    public function __construct($total, $perPage, $currentPage, $baseUrl) {
        $this->_total = $total;
        $this->_perPage = $perPage;
        $this->_currentPage = $currentPage;
        $this->_baseUrl = $baseUrl;
    }
    
    public function previousLink() {
        if($this->_currentPage == 1) {
            return '';
        }
        
        return $this->_baseUrl . '/' . ($this->_currentPage - 1);
    }
    
    public function nextLink() {
        if($this->_currentPage >= $this->totalPages()) {
            return '';
        };
        
        return $this->_baseUrl . '/' . ($this->_currentPage + 1);
    }
    
    public function from() {
        return $this->_perPage * ($this->_currentPage - 1) + 1;
    }
    
    public function to() {
        if($this->_currentPage == $this->totalPages()) {
            return $this->_total;
        }
        
        return $this->_currentPage * $this->_perPage;
    }
    
    public function totalPages() {
        return ceil($this->_total / $this->_perPage);
    }
}