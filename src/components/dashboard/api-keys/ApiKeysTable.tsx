import { useState } from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Button, Chip, Spinner, useDisclosure } from '@nextui-org/react';
import { IconInfoCircleFilled, IconTrash } from '@tabler/icons-react';
import NewApiKeyModal from '@/components/dashboard/api-keys/NewApiKeyModal';
import { useQuery } from 'react-query';
import { getSecretKeys } from '@/service/auth/secret-keys';
import DeleteApiKeyModal from './DeleteApiKeyModal';

const ApiKeysTable = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'secret-keys',
    queryFn: getSecretKeys,
  });

  const { isOpen: isNewModalOpen, onOpen: onNewModalOpen, onOpenChange: onNewModalOpenChange } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const [selectedSecretKey, setSelectedSecretKey] = useState<SecretKey | undefined>(undefined);

  const handleDeleteSecretKey = (secretKey: SecretKey) => {
    setSelectedSecretKey(secretKey);
    onDeleteModalOpen();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3>API Keys</h3>
        <CreateSecretKeyButton onOpen={onNewModalOpen} />
      </div>
      <blockquote className="text-amber-700 inline-flex items-center gap-3 text-sm border border-amber-200 bg-amber-100 p-4 rounded-2xl">
        <IconInfoCircleFilled />
        <p>
          API keys are used to authenticate <strong>Admin requests</strong> to the shop&apos;s API. You can create
          multiple keys for different applications.
        </p>
      </blockquote>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn align="center">Secret Key</TableColumn>
          <TableColumn align="center">Status</TableColumn>
          <TableColumn align="center">Created at</TableColumn>
          <TableColumn align="end" width={'1fr'}>
            {''}
          </TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex flex-col items-center gap-4">
              {isLoading ? (
                <>
                  <Spinner aria-label="Loading" />
                  <p className="text-center">Loading secret keys...</p>
                </>
              ) : (
                <>
                  <p>No secret keys found.</p>
                  <CreateSecretKeyButton onOpen={onNewModalOpen} />
                </>
              )}
            </div>
          }
        >
          {isSuccess && data?.length > 0
            ? data.map((secretKey) => (
                <TableRow key={`secretKey.${secretKey.name}.${secretKey.id}`}>
                  <TableCell>{secretKey.name}</TableCell>
                  <TableCell>{secretKey.prefix}</TableCell>
                  <TableCell>
                    <Chip color={secretKey.enabled ? 'success' : 'danger'} variant="flat">
                      {secretKey.enabled ? 'Active' : 'Inactive'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {new Date(secretKey.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Button color="danger" variant="light" isIconOnly onClick={() => handleDeleteSecretKey(secretKey)}>
                      <IconTrash size="1.25rem" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
      <NewApiKeyModal isOpen={isNewModalOpen} onOpenChange={onNewModalOpenChange} />
      <DeleteApiKeyModal
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalOpenChange}
        secretApiKey={selectedSecretKey}
      />
    </>
  );
};

interface ICreateSecretKeyButtonProps {
  onOpen: () => void;
}

const CreateSecretKeyButton = ({ onOpen }: ICreateSecretKeyButtonProps) => {
  return (
    <Button color="primary" onClick={onOpen}>
      Create Secret Key
    </Button>
  );
};

export default ApiKeysTable;
