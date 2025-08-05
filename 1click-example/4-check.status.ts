import { OneClickService} from '@defuse-protocol/one-click-sdk-typescript';

async function checkStatus() {

    try {
        const status = await OneClickService.getExecutionStatus(process.env.DEPOSIT_ADDRESS as string);
        console.log(status);
    } catch (error) {
        console.error(error);
    }
}

checkStatus();
