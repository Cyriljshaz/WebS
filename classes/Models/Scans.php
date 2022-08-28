<?php
class ScansModel
{
    public function __construct()
    {
    }

    protected function getFields()
    {
        return [
            'scs_id',
            'scs_name',
            'scs_last_chapter',
            'tls_id',
            'scs_language',
            'scs_last_update',
            'scs_active',
            'scs_mainpage_url', // https://www.asurascans.com/manga/my-school-life-pretending-to-be-a-worthless-person/
            'scs_translator',
        ];
    }
}
