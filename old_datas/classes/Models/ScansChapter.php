<?php
class ScansChapter
{
    public function __construct()
    {
    }

    public function getFields()
    {
        return [
            'scc_id',
            'scs_id',
            'scc_name',
            'scc_chapter',
            'scc_scanned_date',
            'scc_readed'
        ];
    }
}
