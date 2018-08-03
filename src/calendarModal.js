module.exports = {
    createModal: function () {
        $('body').prepend(`<div class="modal fade" id="event-modal" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                        <div class="row">
                            <div class="col-md-1" style="display: inline-table">
                                <i class="fas fa-book-open fa-lg" style="color: #36a8f9"></i>
                                <i id="pencil-event" class="fas fa-pencil-alt fa-lg" style="display: none; color: #f2d100"></i>
                            </div>
                            <div class="col-md-7" style="display: inline-table">
                                <h4 class="modal-title" style="display: inline">Резервация</h4>
                            </div>
                                <div class="col-md-1" style="display: inline-table; float: right">
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">×</span>
                                    <span class="sr-only">Close</span>
                                </button>
                                </div>
                        </div>
                    
                </div>
                <div class="modal-body">
                    <input type="hidden" name="event-index" value="">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="min-date" class="col-sm-4 control-label">Име</label>
                            <div class="col-sm-7">
                                <input name="event-name" type="text" class="form-control" maxlength="200">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="min-date" class="col-sm-4 control-label">Пояснения</label>
                            <div class="col-sm-7">
                                <input name="event-description" type="text" class="form-control" maxlength="200">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="min-date" class="col-sm-4 control-label">Брой гости</label>
                            <div class="col-sm-7">
                                <input name="event-person" type="text" class="form-control" placeholder="Въведете от 1 до 9 госта..." maxlength="1">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="min-date" class="col-sm-4 control-label">Дати</label>
                            <div class="col-sm-7">
                                <div class="input-group input-daterange" data-provide="datepicker">
                                    <input name="event-start-date" type="text" class="form-control" value="2012-04-05">
                                    <span class="input-group-addon">до</span>
                                    <input name="event-end-date" type="text" class="form-control" value="2012-04-19">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fas fa-times fa-1x"></i> Отказ</button>
                    <button type="button" class="btn btn-primary" id="save-event"><i class="fas fa-check fa-1x"></i> Запази</button>
                </div>
            </div>
        </div>
    </div>`);
    },
    createModalPerson: function (allpersons, eventid, isEdit) {
        let navcontent = '';
        let tabcontent = '';
        let result = '';

        for (let i = 1; i <= allpersons; i++) {
            if (i === 1) {
                navcontent += `<li class="active"><a href="#person-${i}" data-toggle="tab" aria-expanded="true">Гост ${i}</a></li>`;
                tabcontent += `<div class="tab-pane fade active in" id="person-${i}"></br>
            <input type="hidden" name="event-index" value="">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="min-date" class="col-sm-4 control-label">Име</label>
                    <div class="col-sm-7">
                        <input name="event-name" type="text" class="form-control" maxlength="200">
                    </div>
                </div>
                <div class="form-group">
                    <label for="min-date" class="col-sm-4 control-label">ID</label>
                    <div class="col-sm-7">
                        <input name="event-id" type="text" class="form-control" maxlength="12">
                    </div>
                </div>
                <div class="form-group">
                    <label for="min-date" class="col-sm-4 control-label">Адрес</label>
                    <div class="col-sm-7">
                        <input name="event-address" type="text" class="form-control" maxlength="200">
                    </div>
                </div>
            </form>
          </div>`
            } else {
                navcontent += `<li><a href="#person-${i}" data-toggle="tab" aria-expanded="true">Гост ${i}</a></li>`;
                tabcontent += `<div class="tab-pane fade" id="person-${i}"></br>
            <input type="hidden" name="event-index" value="">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="min-date" class="col-sm-4 control-label">Име</label>
                    <div class="col-sm-7">
                        <input name="event-name" type="text" class="form-control" maxlength="200">
                    </div>
                </div>
                <div class="form-group">
                    <label for="min-date" class="col-sm-4 control-label">ID</label>
                    <div class="col-sm-7">
                        <input name="event-id" type="text" class="form-control" maxlength="12">
                    </div>
                </div>
                <div class="form-group">
                    <label for="min-date" class="col-sm-4 control-label">Адрес</label>
                    <div class="col-sm-7">
                        <input name="event-address" type="text" class="form-control" maxlength="200">
                    </div>
                </div>
            </form>
          </div>`
            }
        }

        result = `
   <div class="modal fade" id="modal-person" role="dialog" style="display: none;" data-eventid="${eventid}">
      <div class="modal-dialog">
         <!-- Modal Person content-->
         <div class="modal-content">
            <div class="modal-header">
            <div class="row">
                <div class="col-md-1" style="display: inline-table">
                    <i class="fas fa-address-book fa-lg" style="color: #36a8f9"></i>
                    <i id="pencil-person" class="fas fa-pencil-alt fa-lg" style="display: none; color: #f2d100"></i>
                </div>
                <div class="col-md-7" style="display: inline-table">
                    <h4 class="modal-title" style="display: inline">Лични данни</h4>
                </div>
                <div class="col-md-1" style="display: inline-table; float: right">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Close</span>
                    </button>
                </div>
            </div>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs">` +
            navcontent +
            `</ul>
                <div id="myTabContent" class="tab-content">` +
            tabcontent +
            `</div>
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fas fa-times fa-1x"></i> Отказ</button>
                    <button type="button" class="btn btn-primary" id="save-person"><i class="fas fa-check fa-1x"></i> Запази</button>
                </div>
         </div>
      </div>
   </div>
</div>
`;
        $('body').prepend(result);
        if (isEdit) {
            $('#pencil-person').show();
        } else {
            $('#pencil-person').hide();
        }

        $('#modal-person').modal('show');

        let dataSource = $('#calendar').data('calendar').getDataSource();
        let eventindex;
        for (let i in dataSource) {
            if (dataSource[i].id === eventid) {
                eventindex = i;
            }
        }

        // If Event Editing
        if (isEdit) {
            if (allpersons > dataSource[eventindex].persons.length) {
                let addedPersonLength = allpersons - dataSource[eventindex].persons.length;
                let arr = dataSource[eventindex].persons;
                for (let i = 0; i < addedPersonLength; i++) {
                    arr.push({
                        name: '',
                        personID: '',
                        address: ''
                    });
                }
                dataSource[eventindex].persons = arr;
            }
            for (let i = 1; i <= allpersons; i++) {
                $(`#person-${i} input[name="event-name"]`).val(dataSource[eventindex].persons[i - 1].name);
                $(`#person-${i} input[name="event-id"]`).val(dataSource[eventindex].persons[i - 1].personID);
                $(`#person-${i} input[name="event-address"]`).val(dataSource[eventindex].persons[i - 1].address);
            }
        }

        // Attach on click save event
        $('#save-person').click((e) => {
            let persons = [];

            for (let i = 1; i <= allpersons; i++) {
                let person = {
                    name: $(`#person-${i} input[name="event-name"]`).val(),
                    personID: $(`#person-${i} input[name="event-id"]`).val(),
                    address: $(`#person-${i} input[name="event-address"]`).val(),
                }
                if (person.name !== '') {
                    persons.push(person);
                }
            }
            dataSource[eventindex].persons = persons;
            $('#calendar').data('calendar').setDataSource(dataSource); // Refresh room events

            // Setting sqlite table 'persons'
            let dbPathFile = path.join(app.getPath('userData'), 'ghm.db');
            let sqldb = new sqlite3.Database(dbPathFile, function () {
                sqldb.run('PRAGMA foreign_keys=on');
            });

            let roomid = $('#window-title').data('roomid');
            let sql = [];
            for (let i in persons) {
                sql.push(`(${roomid}, ${eventid}, '${persons[i].name}', '${persons[i].personID}', '${persons[i].address}')`);
            }
            sql = sql.join(',');

            sqldb.serialize(() => {
                if (isEdit) {
                    sqldb.run(`DELETE FROM persons WHERE room_id=${roomid} AND event_id=${eventid}`, (err) => {
                        if (err) console.log(err.errno + ': ' + err.message);
                    });
                }
                if (sql !== '') {
                    sqldb.run(`INSERT INTO persons VALUES${sql}`, (err) => {
                        if (err) console.log(err.errno + ': ' + err.message);
                    });
                }
                sqldb.close();
            });

            $('#modal-person').modal('hide');
        });

        // Destroys the modal
        $("#modal-person").on('hidden.bs.modal', function () {
            $(this).data('bs.modal', null);
        });
    }
}