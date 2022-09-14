<?php

class Translators
{
    public function __constructor()
    {
    }

    public function getFields()
    {
        return [
            'tls_id',
            'tls_name',
            'tls_url',
            'tls_url_scrap',
            'tls_target_pic',
            'tls_target_chapter_nbr', // balise select to get chap nbr
            'tls_target_next_btn',
            'tls_target_chap_list',
        ];
    }
}
