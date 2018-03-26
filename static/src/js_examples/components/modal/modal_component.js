import React, { PropTypes } from 'react';

const Modal = props =>
    <div className="modal fade" id="taskDescriptionModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div className="modal-body"> helo world </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default btn-simple" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-info btn-simple">Save</button>
          </div>
        </div>
      </div>
    </div>

export default Modal;

