import { OneClickService} from '@defuse-protocol/one-click-sdk-typescript';
import { depositAddress } from './3-send-deposit';

/**
 * Step 4: Check status of Intent
 *
 * This endpoint checks the status of an intent after deposit is sent
 *
 */

async function checkStatus() {

    try {
        const status = await OneClickService.getExecutionStatus(depositAddress);
        console.log(status);
    } catch (error) {
        console.error(error);
    }
}

checkStatus();
