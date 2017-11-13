/*
 * LiskHQ/lisky
 * Copyright © 2017 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import readline from 'readline';
import getInputsFromSources from '../../../src/utils/input';
import * as inputUtils from '../../../src/utils/input/utils';
import {
	getFirstQuotedString,
	getQuotedStrings,
	createFakeInterface,
	hasAncestorWithTitleMatching,
} from '../utils';

export function anErrorOccursRetrievingTheInputsFromTheirSources() {
	const errorMessage = getFirstQuotedString(this.test.parent.title);
	getInputsFromSources.rejects(new Error(errorMessage));
	this.test.ctx.errorMessage = errorMessage;
}

export function thePassphraseIsAvailableFromTheSource() {
	const { passphrase } = this.test.ctx;
	inputUtils.getPassphrase.resolves(passphrase);
}

export function theSecondPassphraseIsAvailableFromTheSource() {
	const { secondPassphrase } = this.test.ctx;
	inputUtils.getPassphrase.resolves(secondPassphrase);
}

export function thePasswordIsAvailableFromTheSource() {
	const { password } = this.test.ctx;
	if (hasAncestorWithTitleMatching(this.test, /multiple options integration/)) {
		inputUtils.getPassphrase.onSecondCall().resolves(password);
	} else {
		inputUtils.getPassphrase.resolves(password);
	}
}

export function theDataIsAvailableFromTheSource() {
	const { data } = this.test.ctx;
	inputUtils.getData.resolves(data);
}

export function thePassphraseCanBeRetrievedFromItsSource() {
	const { passphrase } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase,
		secondPassphrase: null,
		password: null,
		data: null,
	});
}

export function thePassphraseAndSecondPassphraseCanBeRetrievedFromTheirSources() {
	const { passphrase, secondPassphrase } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase,
		secondPassphrase,
		password: null,
		data: null,
	});
}

export function thePasswordAndEncryptedPassphraseCanBeRetrievedFromTheirSources() {
	const { password, cipherAndIv: { cipher } } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase: null,
		secondPassphrase: null,
		password,
		data: cipher,
	});
}

export function theEncryptedPassphraseCanBeRetrievedFromItsSource() {
	const { cipherAndIv: { cipher } } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase: null,
		secondPassphrase: null,
		password: null,
		data: cipher,
	});
}

export function thePasswordCanBeRetrievedFromItsSource() {
	const { password } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase: null,
		secondPassphrase: null,
		password,
		data: null,
	});
}

export function thePassphraseAndPasswordCanBeRetrievedFromTheirSources() {
	const { passphrase, password } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase,
		secondPassphrase: null,
		password,
		data: null,
	});
}

export function thePassphraseAndMessageCanBeRetrievedFromTheirSources() {
	const { passphrase, message } = this.test.ctx;
	getInputsFromSources.resolves({
		passphrase,
		secondPassphrase: null,
		password: null,
		data: message,
	});
}

export function thePassphraseAndTheSecondPassphraseAreProvidedViaStdIn() {
	const { passphrase, secondPassphrase } = this.test.ctx;
	inputUtils.getStdIn.resolves({ passphrase, data: secondPassphrase });
	inputUtils.getPassphrase.onFirstCall().resolves(passphrase);
	inputUtils.getPassphrase.onSecondCall().resolves(secondPassphrase);
}

export function thePassphraseAndThePasswordAreProvidedViaStdIn() {
	const { passphrase, password, stdInInputs = [] } = this.test.ctx;

	inputUtils.getStdIn.resolves({ passphrase, data: password });
	inputUtils.getPassphrase.onFirstCall().resolves(passphrase);
	inputUtils.getPassphrase.onSecondCall().resolves(password);

	this.test.ctx.stdInInputs = [...stdInInputs, 'passphrase', 'password'];
}

export function thePasswordIsProvidedViaStdIn() {
	const { password } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(password));
	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ password });
	}
	if (typeof inputUtils.getPassphrase.resolves === 'function') {
		inputUtils.getPassphrase.resolves(password);
	}

	this.test.ctx.passwordIsRequired = true;
}

export function thePassphraseAndTheMessageAreProvidedViaStdIn() {
	const { passphrase, message, stdInInputs = [] } = this.test.ctx;
	inputUtils.getStdIn.resolves({ passphrase, data: message });
	this.test.ctx.stdInInputs = [...stdInInputs, 'passphrase', 'message'];
}

export function theMessageIsProvidedViaStdIn() {
	const { message, stdInInputs = [] } = this.test.ctx;
	inputUtils.getStdIn.resolves({ data: message });
	this.test.ctx.stdInInputs = [...stdInInputs, 'message'];
}

export function inputs() {
	this.test.ctx.inputs = getQuotedStrings(this.test.parent.title);
}

export function anInput() {
	const input = getFirstQuotedString(this.test.parent.title);
	this.test.ctx.input = input;
}

export function aSourceWithoutDelimiter() {
	this.test.ctx.source = getFirstQuotedString(this.test.parent.title);
}

export function aSourceWithDelimiter() {
	this.test.ctx.source = getFirstQuotedString(this.test.parent.title);
}

export function aPromptMessage() {
	this.test.ctx.promptMessage = getFirstQuotedString(this.test.parent.title);
}

export function aPromptDisplayName() {
	this.test.ctx.displayName = getFirstQuotedString(this.test.parent.title);
}

export function theSecondPassphraseIsProvidedViaThePrompt() {
	const { secondPassphrase } = this.test.ctx;
	this.test.ctx.vorpal.activeCommand.prompt.resolves({ secondPassphrase });
}

export function thePassphraseAndTheSecondPassphraseAreProvidedViaThePrompt() {
	const { passphrase, secondPassphrase } = this.test.ctx;
	this.test.ctx.vorpal.activeCommand.prompt.onFirstCall().resolves({ passphrase });
	this.test.ctx.vorpal.activeCommand.prompt.onSecondCall().resolves({ passphrase: secondPassphrase });
}

export function thePassphraseIsProvidedViaThePrompt() {
	const { vorpal, passphrase } = this.test.ctx;

	vorpal.activeCommand.prompt.onFirstCall().resolves({ passphrase });
	this.test.ctx.getPromptPassphraseCall = () => vorpal.activeCommand.prompt.firstCall;

	if (typeof inputUtils.getPassphrase.resolves === 'function') {
		inputUtils.getPassphrase.onFirstCall().resolves(passphrase);
		this.test.ctx.getGetPassphrasePassphraseCall = () => inputUtils.getPassphrase.firstCall;
	}
}

export function thePasswordIsProvidedViaThePrompt() {
	const { vorpal, password, getPromptPassphraseCall, getGetPassphrasePassphraseCall } = this.test.ctx;

	if (getPromptPassphraseCall) {
		vorpal.activeCommand.prompt.onSecondCall().resolves({ password });
	} else {
		vorpal.activeCommand.prompt.resolves({ password });
	}

	if (typeof inputUtils.getPassphrase.resolves === 'function') {
		if (getGetPassphrasePassphraseCall) {
			inputUtils.getPassphrase.onSecondCall().resolves(password);
			this.test.ctx.getGetPassphrasePasswordCall = () => inputUtils.getPassphrase.secondCall;
		} else {
			inputUtils.getPassphrase.resolves(password);
			this.test.ctx.getGetPassphrasePasswordCall = () => inputUtils.getPassphrase.firstCall;
		}
	}
}

export function thePassphraseShouldNotBeRepeated() {
	this.test.ctx.shouldRepeat = false;
}

export function thePassphraseShouldBeRepeated() {
	this.test.ctx.shouldRepeat = true;
}

export function thePassphraseIsNotSuccessfullyRepeated() {
	const { vorpal, passphrase } = this.test.ctx;
	vorpal.activeCommand.prompt.onSecondCall().resolves({
		passphrase: `${passphrase.slice(0, -1)}y`,
	});
}

export function thePassphraseIsSuccessfullyRepeated() {
	const { vorpal, passphrase } = this.test.ctx;
	vorpal.activeCommand.prompt.onSecondCall().resolves({ passphrase });
}

export function someData() {
	this.test.ctx.data = getFirstQuotedString(this.test.parent.title);
}

export function nothingIsProvidedViaStdIn() {
	readline.createInterface.returns(createFakeInterface(''));
}

export function thePasswordAndTheEncryptedPassphraseAreProvidedViaStdIn() {
	const { password, cipherAndIv: { cipher }, stdInInputs = [] } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(`${password}\n${cipher}`));
	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ passphrase: password, data: cipher });
	}
	if (typeof inputUtils.getPassphrase.resolves === 'function') {
		inputUtils.getPassphrase.resolves(password);
	}

	this.test.ctx.dataIsRequired = true;
	this.test.ctx.stdInInputs = [...stdInInputs, 'passphrase'];
}

export function theEncryptedPassphraseIsProvidedViaStdIn() {
	const { cipherAndIv: { cipher }, stdInInputs = [] } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(cipher));
	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ data: cipher });
	}

	this.test.ctx.dataIsRequired = true;
	this.test.ctx.stdInInputs = [...stdInInputs, 'passphrase'];
}

export function thePassphraseIsProvidedViaStdIn() {
	const { passphrase, stdInInputs = [] } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(passphrase));
	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ passphrase });
	}

	this.test.ctx.passphraseIsRequired = true;
	this.test.ctx.stdInInputs = [...stdInInputs, 'passphrase'];
}

export function theSecondPassphraseIsProvidedViaStdIn() {
	const { secondPassphrase } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(secondPassphrase));
	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ secondPassphrase });
	}

	this.test.ctx.secondPassphraseIsRequired = true;
}

export function theDataIsProvidedViaStdIn() {
	const { data } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(data));
	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ data });
	}

	this.test.ctx.dataIsRequired = true;
}

export function theSecondPassphraseAndTheDataAreProvidedViaStdIn() {
	const { secondPassphrase, data } = this.test.ctx;

	if (typeof inputUtils.getStdIn.resolves === 'function') {
		inputUtils.getStdIn.resolves({ secondPassphrase, data });
	}

	this.test.ctx.secondPassphraseIsRequired = true;
	this.test.ctx.dataIsRequired = true;
}

export function thePassphraseTheSecondPassphraseThePasswordAndTheDataAreProvidedViaStdIn() {
	const { passphrase, secondPassphrase, password, data } = this.test.ctx;

	readline.createInterface.returns(createFakeInterface(`${passphrase}\n${secondPassphrase}\n${password}\n${data}`));

	this.test.ctx.passphraseIsRequired = true;
	this.test.ctx.secondPassphraseIsRequired = true;
	this.test.ctx.passwordIsRequired = true;
	this.test.ctx.dataIsRequired = true;
}

export function thePassphraseIsStoredInEnvironmentalVariable() {
	const { passphrase } = this.test.ctx;
	const environmentalVariableName = getFirstQuotedString(this.test.parent.title);

	process.env[environmentalVariableName] = passphrase;

	this.test.ctx.environmentalVariableName = environmentalVariableName;
	this.test.ctx.passphraseSource = `env:${environmentalVariableName}`;
}

export function environmentalVariableIsNotSet() {
	const environmentalVariableName = getFirstQuotedString(this.test.parent.title);

	delete process.env[environmentalVariableName];

	this.test.ctx.environmentalVariableName = environmentalVariableName;
}

export function aPassphraseFilePath() {
	const { passphrase } = this.test.ctx;
	const filePath = getFirstQuotedString(this.test.parent.title);

	this.test.ctx.fileContents = `${passphrase}\nSome irrelevant text\non subsequent lines\n`;
	this.test.ctx.filePath = filePath;
	this.test.ctx.passphraseSource = `file:${filePath}`;
}

export function anUnknownPassphraseSource() {
	this.test.ctx.passphraseSource = 'unknownSource';
}

export function thePassphraseIsProvidedAsPlaintext() {
	const { passphrase } = this.test.ctx;
	this.test.ctx.passphraseSource = `pass:${passphrase}`;
}

export function aDataFilePath() {
	const { data } = this.test.ctx;
	const filePath = getFirstQuotedString(this.test.parent.title);

	this.test.ctx.fileContents = data;
	this.test.ctx.filePath = filePath;
}

export function noDataSourceIsProvided() {}

export function dataIsProvidedViaStdIn() {
	const { data, stdInInputs = [] } = this.test.ctx;
	this.test.ctx.stdInData = data;
	this.test.ctx.stdInInputs = [...stdInInputs, 'data'];
}

export function dataIsProvidedAsAnArgument() {
	const { data } = this.test.ctx;
	this.test.ctx.argData = data;
}

export function dataIsProvidedViaAnUnknownSource() {
	this.test.ctx.sourceData = 'unknownSource';
}

export function dataIsProvidedViaAFileSource() {
	const { filePath } = this.test.ctx;
	this.test.ctx.sourceData = `file:${filePath}`;
}