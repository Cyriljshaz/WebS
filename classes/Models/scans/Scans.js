class ScansModel {
    constructor() {

    }

    getFields() {
        return [
            'scs_id',
            'scs_name',
            'scs_last_chapter',
            'tls_id',
            'scs_language',
            'scs_last_scanned_date',
            'scs_active',
        ]
    }
}

module.exports = ScansModel