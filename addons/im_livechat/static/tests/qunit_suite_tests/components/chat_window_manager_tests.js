/** @odoo-module **/

import {
    afterNextRender,
    start,
    startServer,
} from '@mail/../tests/helpers/test_utils';

QUnit.module('im_livechat', {}, function () {
QUnit.module('components', {}, function () {
QUnit.module('chat_window_manager', {}, function () {
QUnit.module('chat_window_manager_tests.js');

QUnit.test('closing a chat window with no message from admin side unpins it', async function (assert) {
    assert.expect(1);

    const pyEnv = await startServer();
    const resPartnerId1 = pyEnv['res.partner'].create({ name: "Demo" });
    pyEnv['res.users'].create({ partner_id: resPartnerId1 });
    const mailChannelId1 = pyEnv['mail.channel'].create(
        {
            channel_type: "livechat",
            is_pinned: true,
            channel_partner_ids: [pyEnv.currentPartnerId, resPartnerId1],
            uuid: 'channel-10-uuid',
        },
    );
    const { createMessagingMenuComponent, env } = await start({ hasChatWindow: true });
    await createMessagingMenuComponent();

    await afterNextRender(() => document.querySelector(`.o_MessagingMenu_toggler`).click());
    await afterNextRender(() => document.querySelector(`.o_NotificationList_preview`).click());
    await afterNextRender(() => document.querySelector(`.o_ChatWindowHeader_commandClose`).click());
    const channels = await env.services.rpc({
        model: 'mail.channel',
        method: 'read',
        args: [mailChannelId1],
    }, { shadow: true });
    assert.strictEqual(
        channels[0].is_pinned,
        false,
        'Livechat channel should not be pinned',
    );
});

});
});
});
