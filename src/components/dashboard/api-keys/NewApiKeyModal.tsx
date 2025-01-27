import { useState } from 'react';
import { IconCircleCheck, IconInfoCircleFilled } from '@tabler/icons-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button, Checkbox, Input, Snippet } from '@nextui-org/react';
import { useMutation, useQueryClient } from 'react-query';
import { createSecretKey } from '@/service/auth/secret-keys';

interface INewApiKeyModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const NewApiKeyModal = ({ isOpen, onOpenChange }: INewApiKeyModalProps) => {
  const queryClient = useQueryClient();

  const [secretKeyName, setSecretKeyName] = useState('');
  const [securityCheck, setSecurityCheck] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const createSecretKeyMutation = useMutation({
    mutationFn: createSecretKey,
    onSuccess: (data) => {
      setSecretKey(data.secret_key);
      queryClient.refetchQueries('secret-keys');
    },
  });

  const validateForm = () => {
    if (!secretKeyName) {
      return setErrorMessages(['Please enter a name for your new API key.']);
    }

    if (secretKeyName.length < 3) {
      return setErrorMessages(['API key name must be at least 3 characters long.']);
    }

    if (!securityCheck) {
      return setErrorMessages(['Please confirm that you understand the purpose of this API key.']);
    }

    setErrorMessages([]);

    return true;
  };

  const handleCreateSecretKey = async () => {
    if (!validateForm()) return;

    if (secretKeyName) {
      await createSecretKeyMutation.mutateAsync(secretKeyName);
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">New API Key</ModalHeader>
            {secretKey && createSecretKeyMutation.isSuccess ? (
              <ModalBody>
                <div className="text-success-700 inline-flex items-center gap-3 text-sm border border-success-200 bg-success-100 p-4 rounded-2xl">
                  <IconCircleCheck />
                  Your new API key has been created successfully.
                </div>
                <div className="flex flex-col gap-2">
                  <strong>API Key</strong>
                  <Snippet symbol="">{secretKey}</Snippet>
                  <blockquote className="text-danger-700 inline-flex items-center gap-3 text-sm border border-danger-200 bg-danger-100 p-4 rounded-2xl">
                    <IconInfoCircleFilled />
                    <p>
                      <strong>Important:</strong> Save this key in a secure place. You won&apos;t be able to see it
                      again.
                    </p>
                  </blockquote>
                </div>
              </ModalBody>
            ) : (
              <ModalBody>
                <p>Enter a name for your new API key.</p>
                <Input
                  placeholder="Enter a name for your new API key"
                  description="This name will be used to identify the key."
                  size="lg"
                  labelPlacement="outside"
                  value={secretKeyName}
                  onValueChange={setSecretKeyName}
                />
                <Checkbox checked={securityCheck} onChange={() => setSecurityCheck(!securityCheck)}>
                  I understand that this key is used to authenticate <strong>Admin requests</strong> to the shop&apos;s
                  API.
                </Checkbox>
                <ul className="list-disc pl-6">
                  {errorMessages.map((message, idx) => (
                    <li key={`error.${idx}`} className="text-danger">
                      {message}
                    </li>
                  ))}
                </ul>
              </ModalBody>
            )}
            <ModalFooter className="flex gap-4">
              <Button color="default" variant="light" onClick={onClose}>
                Close
              </Button>
              {!secretKey && !createSecretKeyMutation.isSuccess && (
                <Button color="primary" onClick={handleCreateSecretKey} isLoading={createSecretKeyMutation.isLoading}>
                  Create
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewApiKeyModal;
