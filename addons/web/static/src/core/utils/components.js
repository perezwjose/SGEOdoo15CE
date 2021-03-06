/** @odoo-module **/

const { Component, onError, xml } = owl;

export class ErrorHandler extends Component {
    setup() {
        onError((error) => {
            this.props.onError(error);
        });
    }
}
ErrorHandler.template = xml`<t t-slot="default" />`;
ErrorEvent.props = ["onError"];
